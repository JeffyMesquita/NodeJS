var Elevador = {
   andar: 0,
   subir: function() {
      this.andar++;
   },
   descer: function(){
      this.andar--;
   }
}

module.exports = Elevador;