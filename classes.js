class Pacman {
  constructor() {
    this.position = Espacial.set_position([0,0]); // posição do pacman no campo
    this.sentido = Espacial.set_sentido('L'); //
    this.vidas = 5;
    this.morto = false;
    this.comivel = true;
  }
  function comer() {

  }
  function morrer() {
    this.morto = true;
    this.vidas-- ;
  }
}

class Espacial { // classe pra descrever métodos de localização/orientação
  this.sentidos = ['Cima' : 0, 'Direita' : 1, 'Baixo' : 2, 'Esquerda' : 3];
  function set_sentido(sentido) {

  }
  function get_sentido() {

  }
  function set_position(position) {

  }
  function get_position() {

  }
}

class Fantasma { // classe base dos fantasmas
  constructor() {

  }
}
class Blinky extends Fantasma { // Fantasma Vermelho
  constructor() {

  }
}
class Pinky extends Fantasma { // Fantasma Rosa
  constructor() {

  }
}
class Inky extends Fantasma { // Fantasma Ciano
  constructor() {

  }
}
class Clyde extends Fantasma { // Fantama Amarelo
  constructor() {

  }
}
