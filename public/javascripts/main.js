(function(){

    /* Namespace App */
    window.App = {
        helpers     : {},
        collections : {},
        models      : {},
        views         : {},
    };

    /* Artists Model */
    App.models.artist = Backbone.Model.extend({
        validate: function(attrs){
            /* Basic validation */
            switch(true){
                case !attrs.name: return 'Attribute "Name" is required.'; break;
                case !attrs.picture: return 'Attribute "Picture" is required.'; break;
                case !attrs.positive: return 'Attribute "Positive" is required.'; break;
                case !attrs.negative: return 'Attribute "Negative" is required.'; break;
                case !attrs.description: return 'Attribute "description" is required.'; break;
                case typeof attrs.name !== "string": return 'Attribute "Name" might be string.'; break;
                case typeof attrs.picture !== "string": return 'Attribute "Picture" might be string.'; break;
                case typeof attrs.positive !== "number": return 'Attribute "Positive" might be integer.'; break;
                case attrs.positive <= 0 : return 'Attribute "Positive" might be greater than zero.'; break;
                case typeof attrs.negative !== "number": return 'Attribute "Negative" might be integer.'; break;
                case attrs.negative <= 0: return 'Attribute "Negative" might be greater than zero.'; break;
                case typeof attrs.description !== "string": return 'Attribute "description" might be integer.'; break;
            }
        }
    });

    /* Artist Collection */
    App.collections.artists = Backbone.Collection.extend({
        model : App.models.artist,
    })

    /**
     * Returns a valid list of artists from the collection
     * @param {object} collection
     * @return {object} array
     */
    App.helpers.artistValidList = function (collection){
        var valid_list = [];
        for( i in collection.models ) {
            if ( collection.models[i].isValid() ){
                var temp = collection.models[i].attributes;
                valid_list.push({
                    name: temp.name,
                    picture: temp.picture,
                    positive: parseInt((temp.positive * 100 /  (temp.positive + temp.negative)) ),
                    negative: parseInt((temp.negative * 100 /  (temp.positive + temp.negative)) ),
                    description: temp.description,
                });
            }
        }
        return _.sortBy(valid_list, 'positive').reverse();
    }

    //Get the json data from fazenda.json file
    $.getJSON('fazenda.json', function(obj){
        //Create a collection from a list
        var artists = new App.collections.artists(obj.data);

        //Create a view to render its contents
        App.views.artist = Backbone.View.extend({
            templateList: _.template($('#artists-template').html()),
            initialize: function(){
                this.render();
            },
            render: function(){
                this.$el.html(this.templateList({list: App.helpers.artistValidList(artists)}));
                return this;
            }
        });

        //Initialize the view and render the HTML
        var artist = new App.views.artist({ el : "#list-artists" });
    })









})()