Type.registerNamespace('Frosting');
Frosting.Utilities = Frosting.Utilities || {};

Frosting.Utilities.Taxonomy = (function() {
  'use strict';
  
  var publics = {
    getAllTermsInSet: _getAllTermsInSet,
    getTermsAsTree:  _getTermsAsTree
  };

  /**
   * Returns a termset, based on Name
   *
   * @param {string} termSetname - Termset Name
   * @param {object} callback - Callback function to call upon completion and pass termset into
   */
  function _getAllTermsInSet(termSetName) {  
    return Rx.Observable.create(function(subscriber) {
      var termSets = Frosting.Globals.defaultTermStore.getTermSetsByName(termSetName, 1033);
      var termSet = termSets.getByName(termSetName);
      var allTerms = termSet.getAllTerms();
    
      Frosting.Globals.context.load(allTerms);
      Frosting.Globals.context.executeQueryAsync(
        function(){
          subscriber.next(allTerms);
          subscriber.complete();
        },
        function(sender, args){ observer.error(args); });
    }); 
  }

  /**
   * Returns an array object of terms as a tree
   *
   * @param {string} id - Termset ID
   * @param {object} callback - Callback function to call upon completion and pass termset into
   */
  function _getTermsAsTree(termSetName, callback) {
    return Rx.Observable.create(function(subscriber) {
      _getAllTermsInSet(termSetName)
      .subscribe(function(terms){
        var termsEnum = terms.getEnumerator();
        var tree = {
          term: terms,
          children: []
        };
        //Loop through each term
        while(termsEnum.moveNext()){
          var currentTerm = termsEnum.get_current();
          var currentTermPath = currentTerm.get_pathOfTerm().split(';');
          var children = tree.children;
          
          for(var i = 0; i < currentTermPath.length; i++) {
            var foundNode = false;
            
            for(var j = 0; j < children.length; j++){
              if(children[j].name === currentTermPath[i]) {
                foundNode = true;
                break;
              }
            }
            // Select the node, otherwise create a new one
            var term = foundNode ? children[j] : { name: currentTermPath[i], children: [] };
            // If we're a child element, add the term properties
            if (i === currentTermPath.length - 1) {
              term.term = currentTerm;
              term.title = currentTerm.get_name();
              term.url = currentTerm.get_localCustomProperties()['_Sys_Nav_SimpleLinkUrl'];
              term.iconName = currentTerm.get_localCustomProperties()['Icon_Name'];
              term.guid = currentTerm.get_id().toString();
            }
            // If the node did exist, let's look there next iteration, else create it
            if (foundNode) {
              children = term.children;
            } else {
              children.push(term);
              // Reset the children pointer to add there next iteration
              if (i !== currentTermPath.length - 1) {
                children = term.children;
              }
            }
          }
        }
        tree = _sortTermsFromTree(tree);
        subscriber.next(tree);
        subscriber.complete();
      });
    });
  };

  /**
   * Sort children array of a term tree by a sort order
   *
   * @param {obj} tree The term tree
   * @return {obj} A sorted term tree
   */
  function _sortTermsFromTree(tree) {
    // Check to see if the get_customSortOrder function is defined. If the term is actually a term collection,
    // there is nothing to sort.
    if (tree.children.length && tree.term && tree.term.get_customSortOrder) {
      var sortOrder = null;
      if (tree.term.get_customSortOrder()) {
        sortOrder = tree.term.get_customSortOrder();
      }
      // If not null, the custom sort order is a string of GUIDs, delimited by a : - else terms are just sorted alphabetically
      if (sortOrder) {
        sortOrder = sortOrder.split(':');
        tree.children.sort(function (a, b) {
          var indexA = sortOrder.indexOf(a.guid);
          var indexB = sortOrder.indexOf(b.guid);
          if (indexA > indexB) {
            return 1;
          } else if (indexA < indexB) {
            return -1;
          }
          return 0;
        });
      } else {
        tree.children.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          }
          return 0;
        });
      }
    }
    for (var i = 0; i < tree.children.length; i++) {
      tree.children[i] = _sortTermsFromTree(tree.children[i]);
    }
    return tree;
  }

  return publics;

})();

SP.SOD.notifyScriptLoadedAndExecuteWaitingJobs('spTaxonomy.js');
