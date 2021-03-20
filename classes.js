class Pacman {
  constructor() {
    this.position = Espacial.set_position([0,0]); // posição do pacman no campo
    this.sentido = Espacial.set_sentido('L'); //
    this.vidas = 5;
    this.morto = false;
    this.comivel = true;
  }
  comer() {

  }
  morrer() {
    this.morto = true;
    this.vidas-- ;
  }
}

class Espacial { // classe pra descrever métodos de localização/orientação
  this.sentidos = ['Cima' : 0, 'Direita' : 1, 'Baixo' : 2, 'Esquerda' : 3];
  set_sentido(sentido) {

  }
  get_sentido() {

  }
  set_position(position) {

  }
  get_position() {

  }
  collision(position1, position2) {
    return position1.toString() == position2.toString()
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

class Mapa {
  constructor() {

  }
}
