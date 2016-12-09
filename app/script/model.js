/**
 * Created by alexandrevagnair on 09/12/2016.
 */
var hetic = hetic || {};

(function() {

    // définie la structure du model user
     ModelUser = Backbone.Model.extend({
        defaults: {
            _id: 0,
            text : "yolo",
            user : "root"
        },
        initialize: function () {
            this.on(
                "change", function (model) {
                    var name = model.get("name");
                }
            );
        }
    });

    //  Appelle au serveur node pour récupérer les messages
    MessageCollection = Backbone.Collection.extend({
        url : 'http://localhost:3000/message/',
    });

    var message = new MessageCollection();
    message.fetch();

    // instance de la vue pour passer les valeurs du model
    MessageView = Backbone.View.extend({
        model : new ModelUser(),
        initialize : function(){
            this.render();
        },
        render : function(){
            // Fait un  truc bien sale parcequ'il n'y a pas le temps ;)
            return "<div class='message-container'>" +
                        "<div class='name'> name : "+this.model.get('user')+"</div>"+
                        "<div class='message'> content : "
                            +this.model.get('text')+
                        "</div>" +
                    "</div>";
        }
    });

    // définie un  nouveau  object
    MessagesView = Backbone.View.extend({
        collection : message,
        initialize : function(){
            this.listenTo(this.collection, "sync", this.render)
        },

        // ajoute les message à la  div#message
        render : function(){
            this.$el.html('');
            var self = this;
            console.log(this.collection)
            var messageView = new MessageView({model: this.collection.at(0)});
            self.$el.append(messageView.render());
           console.log( this.collection.at(0).get( "text") );
        }
    });

    // inicialise la vue
    messages = new MessagesView({el : $('#messages')});

    // créer un  nouvelle vue pour ajouter un message
    AddMessageView = Backbone.View.extend({
        initialize : function () {
            this.render();
        },
        render : function () {
            console.log("ne fais rien")
        },
        events : {
            "click button[type=submit]" : "addComment"
        },

        addComment : function () {
            console.log($("#message").val() );
        },
    });
    // inicialise la vue
    addComment = new AddMessageView({el : $('#messages-card')});

})();

