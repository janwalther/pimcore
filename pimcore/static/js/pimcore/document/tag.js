/**
 * Pimcore
 *
 * This source file is subject to the GNU General Public License version 3 (GPLv3)
 * For the full copyright and license information, please view the LICENSE.md and gpl-3.0.txt
 * files that are distributed with this source code.
 *
 * @copyright  Copyright (c) 2009-2016 pimcore GmbH (http://www.pimcore.org)
 * @license    http://www.pimcore.org/license     GNU General Public License version 3 (GPLv3)
 */

pimcore.registerNS("pimcore.document.tag");
pimcore.document.tag = Class.create({

    id: null,
    name: null,
    inherited: false,

    setupWrapper: function (styleOptions) {

        if (!styleOptions) {
            styleOptions = {};
        }

        var container = Ext.get(this.id);
        container.setStyle(styleOptions);

        return container;
    },

    setName: function(name) {
        this.name = name;
    },

    getName: function () {
        return this.name;
    },

    reloadDocument: function () {
        window.editWindow.reload();
    },

    setInherited: function(inherited, el) {
        this.inherited = inherited;

        // if an element given is as optional second parameter we use this for the mask
        if(!(el instanceof Ext.Element)) {
            el = Ext.get(this.id);
        }

        // check for inherited elements, and mask them if necessary
        if(this.inherited) {
            var mask = el.mask();
            new Ext.ToolTip({
                target: mask,
                showDelay: 100,
                trackMouse:true,
                title: t("click_right_to_overwrite")
            });
            mask.on("contextmenu", function (e) {
                var menu = new Ext.menu.Menu();
                menu.add(new Ext.menu.Item({
                    text: t('overwrite'),
                    iconCls: "pimcore_icon_overwrite",
                    handler: function (item) {
                        this.setInherited(false);
                    }.bind(this)
                }));
                menu.showAt(e.getXY());

                e.stopEvent();
            }.bind(this));
        } else {
            el.unmask();
        }
    },

    getInherited: function () {
        return this.inherited;
    },

    setId: function (id) {
        this.id = id;
    },

    getId: function () {
        return this.id;
    },

    parseOptions: function (options) {
        if(!options || options instanceof Array || typeof options != "object") {
            options = {};
        }

        return options;
    },

    /**
     * HACK to get custom data from a grid instead of the tree
     * better solutions are welcome ;-)
     */
    getCustomPimcoreDropData : function (data){
        if(typeof(data.grid) != 'undefined' && typeof(data.grid.getCustomPimcoreDropData) == 'function'){ //droped from priceList
             var record = data.grid.getStore().getAt(data.rowIndex);
             var data = data.grid.getCustomPimcoreDropData(record);
         }
        return data;
    }
});

