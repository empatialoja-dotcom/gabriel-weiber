import { CategoryData } from './types';

export const MIN_PLAYERS = 3;
export const MAX_PLAYERS = 14;

export const CATEGORIES: CategoryData[] = [
  // Mandatory
  {
    id: 'food',
    label: 'Comida',
    items: [
      { word: 'Pizza', hint: 'Massa com recheio' },
      { word: 'Sushi', hint: 'Peixe cru' },
      { word: 'Hambúrguer', hint: 'Lanche rápido' },
      { word: 'Chocolate', hint: 'Doce derivado do cacau' },
      { word: 'Churrasco', hint: 'Carne na brasa' },
      { word: 'Macarrão', hint: 'Massa italiana' },
      { word: 'Sorvete', hint: 'Sobremesa gelada' },
      { word: 'Pipoca', hint: 'Milho estourado' },
      { word: 'Bolo', hint: 'Doce de festa' },
    ]
  },
  {
    id: 'objects',
    label: 'Objetos',
    items: [
      { word: 'Cadeira', hint: 'Para sentar' },
      { word: 'Celular', hint: 'Comunicação móvel' },
      { word: 'Relógio', hint: 'Mede o tempo' },
      { word: 'Garrafa', hint: 'Guarda líquidos' },
      { word: 'Chave', hint: 'Abre portas' },
      { word: 'Livro', hint: 'Para leitura' },
      { word: 'Óculos', hint: 'Ajuda a ver' },
      { word: 'Mochila', hint: 'Carrega coisas' },
    ]
  },
  {
    id: 'animals',
    label: 'Animais',
    items: [
      { word: 'Cachorro', hint: 'Melhor amigo do homem' },
      { word: 'Gato', hint: 'Felino doméstico' },
      { word: 'Leão', hint: 'Rei da selva' },
      { word: 'Elefante', hint: 'Grande e tem tromba' },
      { word: 'Tubarão', hint: 'Predador marinho' },
      { word: 'Papagaio', hint: 'Ave falante' },
      { word: 'Girafa', hint: 'Pescoço longo' },
      { word: 'Pinguim', hint: 'Ave que nada' },
    ]
  },
  {
    id: 'movies',
    label: 'Filmes',
    items: [
      { word: 'Titanic', hint: 'Navio que afunda' },
      { word: 'Vingadores', hint: 'Heróis da Marvel' },
      { word: 'O Rei Leão', hint: 'Animação na savana' },
      { word: 'Matrix', hint: 'Mundo virtual' },
      { word: 'Harry Potter', hint: 'Bruxo famoso' },
      { word: 'Star Wars', hint: 'Guerra nas estrelas' },
      { word: 'Avatar', hint: 'Alienígenas azuis' },
      { word: 'Shrek', hint: 'Ogro verde' },
    ]
  },
  // Additional
  {
    id: 'countries',
    label: 'Países',
    items: [
      { word: 'Brasil', hint: 'País do samba' },
      { word: 'Japão', hint: 'Terra do sol nascente' },
      { word: 'Estados Unidos', hint: 'Casa de Hollywood' },
      { word: 'França', hint: 'Torre Eiffel' },
      { word: 'Itália', hint: 'Terra da pizza' },
      { word: 'Egito', hint: 'Pirâmides' },
      { word: 'Austrália', hint: 'Cangurus' },
    ]
  },
  {
    id: 'cities',
    label: 'Cidades',
    items: [
      { word: 'Rio de Janeiro', hint: 'Cristo Redentor' },
      { word: 'Paris', hint: 'Cidade Luz' },
      { word: 'Nova York', hint: 'Estátua da Liberdade' },
      { word: 'Tóquio', hint: 'Capital do Japão' },
      { word: 'Londres', hint: 'Big Ben' },
      { word: 'Veneza', hint: 'Canais e gôndolas' },
    ]
  },
  {
    id: 'sports',
    label: 'Esportes',
    items: [
      { word: 'Futebol', hint: 'Bola no pé' },
      { word: 'Basquete', hint: 'Cesta e altura' },
      { word: 'Vôlei', hint: 'Rede e manchete' },
      { word: 'Natação', hint: 'Piscina' },
      { word: 'Tênis', hint: 'Raquete e bolinha' },
      { word: 'Boxe', hint: 'Luvas e ringue' },
    ]
  },
  {
    id: 'jobs',
    label: 'Profissões',
    items: [
      { word: 'Médico', hint: 'Cuida da saúde' },
      { word: 'Professor', hint: 'Ensina alunos' },
      { word: 'Policial', hint: 'Segurança pública' },
      { word: 'Bombeiro', hint: 'Apaga incêndios' },
      { word: 'Advogado', hint: 'Defende leis' },
      { word: 'Cozinheiro', hint: 'Prepara alimentos' },
      { word: 'Astronauta', hint: 'Viaja ao espaço' },
    ]
  },
  {
    id: 'series',
    label: 'Séries',
    items: [
      { word: 'Friends', hint: 'Amigos no café' },
      { word: 'Breaking Bad', hint: 'Química e crime' },
      { word: 'Stranger Things', hint: 'Mundo Invertido' },
      { word: 'Game of Thrones', hint: 'Dragões e tronos' },
      { word: 'La Casa de Papel', hint: 'Assalto e máscaras' },
      { word: 'Round 6', hint: 'Jogos mortais infantis' },
    ]
  },
  {
    id: 'characters',
    label: 'Personagens',
    items: [
      { word: 'Batman', hint: 'Morcego justiceiro' },
      { word: 'Homem-Aranha', hint: 'Picada e teias' },
      { word: 'Mickey Mouse', hint: 'Rato da Disney' },
      { word: 'Darth Vader', hint: 'Lado sombrio da força' },
      { word: 'Super Mario', hint: 'Encanador de bigode' },
      { word: 'Sherlock Holmes', hint: 'Detetive famoso' },
    ]
  },
  {
    id: 'games',
    label: 'Jogos',
    items: [
      { word: 'Minecraft', hint: 'Blocos e construção' },
      { word: 'Fortnite', hint: 'Batalha e construção' },
      { word: 'GTA', hint: 'Cidade e carros' },
      { word: 'League of Legends', hint: 'Batalha de arena' },
      { word: 'Tetris', hint: 'Blocos que caem' },
      { word: 'Pokémon', hint: 'Capturar monstros' },
    ]
  },
  {
    id: 'brands',
    label: 'Marcas',
    items: [
      { word: 'Coca-Cola', hint: 'Refrigerante vermelho' },
      { word: 'Apple', hint: 'Maçã mordida' },
      { word: 'Nike', hint: 'Material esportivo' },
      { word: 'McDonald\'s', hint: 'Arcos dourados' },
      { word: 'Disney', hint: 'Castelo e magia' },
      { word: 'Google', hint: 'Buscador famoso' },
    ]
  },
  {
    id: 'instruments',
    label: 'Instrumentos',
    items: [
      { word: 'Violão', hint: 'Cordas e rodinha' },
      { word: 'Piano', hint: 'Teclas pretas e brancas' },
      { word: 'Bateria', hint: 'Tambores e pratos' },
      { word: 'Violino', hint: 'Arco e cordas' },
      { word: 'Flauta', hint: 'Sopro doce' },
      { word: 'Guitarra', hint: 'Cordas e eletricidade' },
    ]
  }
];

export const TIME_OPTIONS = [3, 5, 8];