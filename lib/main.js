/*

  XF86Back and XF86Forward keys on a Thinkpad are just above the cursor keys,
  so I want to use them to switch active tab.
  I personally use back/forward with the shift modifier to switch tabs, since
  without a modifier I switch the active window in awesome wm.

*/

var windows = require("windows").browserWindows;
var { Hotkey } = require("hotkeys");

exports.main = function() {

   function find_tab_by_index(tabs, idx) {
      for (var i=0; i<tabs.length; i++) {
         if (tabs[i].index == idx) return tabs[i];
      }
   }

   function activate_tab_relative(num) {
      var tabs = windows.activeWindow.tabs;
      if (tabs.length < 2) { return };

      var new_index = tabs.activeTab.index + num;
      if (new_index < 0) {
         find_tab_by_index(tabs, tabs.length-1).activate();
      } else if (new_index >= tabs.length) {
         find_tab_by_index(tabs, 0).activate();
      } else {
         find_tab_by_index(tabs, new_index).activate();
      }
   }

   var prevTab = Hotkey({
      combo: "shift-f1",
      onPress: function() {
          activate_tab_relative(-1);
       }
   });

   var nextTab = Hotkey({
      combo: "shift-f2",
      onPress: function() {
          activate_tab_relative(+1);
       }
   });

};