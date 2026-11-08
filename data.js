/* ============================================================
   O Boleiro — dados reais da casa (Pirambu, Fortaleza)
   Cardápio e preços extraídos do cardápio oficial da loja.
   Tudo que é conteúdo vive aqui.
   ============================================================ */

const CONFIG = {
  brand: 'O Boleiro',
  tagline: 'bolos & doces',
  whatsapp: '5585996877125',
  whatsappDisplay: '(85) 99687-7125',
  phone: '(85) 3281-8437',
  address: 'Rua Nossa Senhora das Graças, 756',
  district: 'Pirambu — Fortaleza, CE',
  cep: '60310-770',
  maps: 'https://www.google.com/maps/search/?api=1&query=Rua+Nossa+Senhora+das+Gra%C3%A7as+756+Pirambu+Fortaleza+CE',
  eta: '30–45 min',
  feeFrom: 6.5,
  feeTo: 20.5,
  radius: '1,5 a 9 km',
  verse: 'Até aqui nos ajudou o Senhor.',
  verseRef: '1 Samuel 7:12',
  hours: [
    { days: 'segunda a sábado', time: '9h — 18h', open: [1, 2, 3, 4, 5, 6], from: '09:00', to: '18:00' },
    { days: 'domingo', time: '9h — 15h45', open: [0], from: '09:00', to: '15:45' }
  ],
  payments: [
    { id: 'pix', label: 'Pix', note: 'chave no atendimento' },
    { id: 'dinheiro', label: 'Dinheiro', note: 'informe o troco' },
    { id: 'debito', label: 'Débito', note: 'maquininha na entrega' },
    { id: 'credito', label: 'Crédito', note: 'maquininha na entrega' },
    { id: 'voucher', label: 'Vale-refeição', note: 'maquininha na entrega' }
  ],
  // faixas de entrega por distância, como na loja
  zones: [
    { km: '1,5 km', fee: 6.5 },
    { km: '2 km', fee: 7.5 },
    { km: '2,5 km', fee: 7.5 },
    { km: '3 km', fee: 8.5 },
    { km: '3,5 km', fee: 9.5 },
    { km: '4 km', fee: 10.5 },
    { km: '4,5 km', fee: 11.5 },
    { km: '5 km', fee: 12.5 },
    { km: '5,5 km', fee: 13.5 },
    { km: '6 km', fee: 14.5 },
    { km: '6,5 km', fee: 15.5 },
    { km: '7 km', fee: 16.5 },
    { km: '7,5 km', fee: 17.5 },
    { km: '8 km', fee: 18.5 },
    { km: '8,5 km', fee: 19.5 },
    { km: '9 km', fee: 20.5 }
  ]
};

const CATEGORIES = [
  { id: 'sobremesas', label: 'Sobremesas' },
  { id: 'tortas', label: 'Tortas' },
  { id: 'bolos-tradicionais', label: 'Bolos tradicionais' },
  { id: 'paes', label: 'Pães' },
  { id: 'bolos-tipicos', label: 'Bolos típicos' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'salgados', label: 'Salgados' },
  { id: 'bolos-especiais', label: 'Bolos especiais' },
  { id: 'mercearia', label: 'Mercearia' }
];

const PRODUCTS = [
  /* — sobremesas — */
  { id: 's1', cat: 'sobremesas', name: 'Pudim de leite', desc: 'pudim inteiro, fabricação própria, calda de caramelo', price: 55, photo: 'pudim-de-leite', tag: 'o clássico' },
  { id: 's2', cat: 'sobremesas', name: 'Pudim gourmet 150g', desc: 'o clássico em porção individual, pronta pra vitrine', price: 8.5, photo: 'pudim-gourmet' },
  { id: 's3', cat: 'sobremesas', name: 'Copo delícia de pudim', desc: 'camadas de pudim e creme, colher inclusa', price: 14, photo: 'copo-delicia-pudim' },
  { id: 's4', cat: 'sobremesas', name: 'Maria maluca', desc: 'massa doce da casa com casquinha crocante', price: 5, photo: 'maria-maluca' },
  { id: 's5', cat: 'sobremesas', name: 'Bolo de pote de chocolate', desc: 'camadas de bolo, recheio e chocolate', price: 8.5, photo: 'bolo-de-pote' },
  { id: 's6', cat: 'sobremesas', name: 'Cookie com gotas de chocolate', desc: 'assado no dia, gotas generosas', price: 4, photo: 'cookie-gotas' },
  { id: 's7', cat: 'sobremesas', name: 'Delícia de abacaxi 250g', desc: 'abacaxi em calda com creme', price: 13, photo: 'delicia-de-abacaxi' },
  { id: 's8', cat: 'sobremesas', name: 'Brownie recheado', desc: 'recheio de doce de leite, casquinha fina', price: 9.5, photo: 'brownie-recheado' },

  /* — tortas — */
  { id: 't1', cat: 'tortas', name: 'Torta de limão', desc: 'recheio de limão, glacê e mousse — 25 fatias', price: 84, photo: 'torta-limao', tag: 'a queridinha' },
  { id: 't2', cat: 'tortas', name: 'Torta de limão pequena', desc: 'serve até 15 fatias, mesma receita', price: 69, photo: 'torta-limao-pequena' },
  { id: 't3', cat: 'tortas', name: 'Fatia de torta de limão', desc: 'a fatia da vitrine, pra levar agora', price: 9, photo: 'fatia-limao' },
  { id: 't4', cat: 'tortas', name: 'Torta de chocolate', desc: 'massa branca, brigadeiro e glacê — 25 fatias', price: 84, photo: 'torta-chocolate' },
  { id: 't5', cat: 'tortas', name: 'Kit 01', desc: 'pudim gourmet grande + 50 salgadinhos + refri 2L', price: 95.99, photo: 'kit-01', tag: 'kit festa' },
  { id: 't6', cat: 'tortas', name: 'Kit 05', desc: 'torta grande (25 fatias) + 100 salgadinhos + refri 2L', price: 149.99, photo: 'kit-05', tag: 'kit festa' },

  /* — bolos tradicionais — */
  { id: 'bt1', cat: 'bolos-tradicionais', name: 'Bolo fofo', desc: 'bolo caseiro, fofo tradicional', price: 24, photo: 'bolo-fofo' },
  { id: 'bt2', cat: 'bolos-tradicionais', name: 'Bolo fofo de laranja', desc: 'massa de laranja, assado no dia', price: 24, photo: 'bolo-laranja' },
  { id: 'bt3', cat: 'bolos-tradicionais', name: 'Meio bolo fofo de goiabada', desc: 'metade do bolo, goiabada derretida', price: 13, photo: 'meio-goiabada' },
  { id: 'bt4', cat: 'bolos-tradicionais', name: 'Meio bolo maisena', desc: 'amanteigado, manteiga de primeira', price: 18, photo: 'meio-maisena' },
  { id: 'bt5', cat: 'bolos-tradicionais', name: 'Fatia de maisena', desc: 'a fatia do bolo amanteigado', price: 5, photo: 'fatia-maisena' },
  { id: 'bt6', cat: 'bolos-tradicionais', name: 'Bolo mole', desc: 'o mole tradicional, massa úmida', price: 24, photo: 'bolo-mole' },
  { id: 'bt7', cat: 'bolos-tradicionais', name: 'Bolo mole especial', desc: 'o mole feito com leite condensado', price: 38, photo: 'bolo-mole-especial' },
  { id: 'bt8', cat: 'bolos-tradicionais', name: 'Bolo misto', desc: 'massa branca com chocolate', price: 28, photo: 'bolo-misto' },

  /* — pães & padaria — */
  { id: 'p1', cat: 'paes', name: 'Pão de coco 250g', desc: 'assado na casa, coco fresco', price: 8.5, art: 'pao' },
  { id: 'p2', cat: 'paes', name: 'Torradas Dubim 200g', desc: 'pacote de torrada crocante', price: 10, art: 'torrada' },
  { id: 'p3', cat: 'paes', name: 'Biscoito de nata com coco', desc: 'biscoito de nata da casa', price: 8, photo: 'biscoito-nata' },
  { id: 'p4', cat: 'paes', name: 'Beliscão de goiaba', desc: 'massa folhada com goiabada', price: 8, art: 'beliscao' },
  { id: 'p5', cat: 'paes', name: 'Casadinho de morango', desc: 'dois biscoitos, doce de leite e morango', price: 8, art: 'casadinho' },

  /* — bolos típicos — */
  { id: 'tp1', cat: 'bolos-tipicos', name: 'Bolo de macaxeira', desc: 'feito da própria macaxeira', price: 48, photo: 'bolo-macaxeira' },
  { id: 'tp2', cat: 'bolos-tipicos', name: 'Meio bolo de macaxeira', desc: 'metade do bolo de macaxeira', price: 25, photo: 'meio-macaxeira' },
  { id: 'tp3', cat: 'bolos-tipicos', name: 'Bolo de milho fofo', desc: 'massa fofinha, milho da estação', price: 37, photo: 'bolo-milho' },
  { id: 'tp4', cat: 'bolos-tipicos', name: 'Meio bolo de milho', desc: 'metade do bolo de milho fofo', price: 19.5, photo: 'meio-milho' },
  { id: 'tp5', cat: 'bolos-tipicos', name: 'Bolo de batata', desc: 'feito com batata de verdade', price: 43, photo: 'bolo-batata' },
  { id: 'tp6', cat: 'bolos-tipicos', name: 'Meio bolo fofo', desc: 'a metade do bolo fofo da casa', price: 13, photo: 'meio-bolo-fofo' },

  /* — bebidas — */
  { id: 'b1', cat: 'bebidas', name: 'Suco de maracujá 300ml', desc: 'batido na hora, gelado', price: 8.5, art: 'suco', tone: 'amarelo' },
  { id: 'b2', cat: 'bebidas', name: 'Suco de acerola 300ml', desc: 'batido na hora, gelado', price: 7, art: 'suco', tone: 'vermelho' },
  { id: 'b3', cat: 'bebidas', name: 'Suco de graviola 300ml', desc: 'batido na hora, gelado', price: 7, art: 'suco', tone: 'branco' },
  { id: 'b4', cat: 'bebidas', name: 'Suco de caju 300ml', desc: 'batido na hora, gelado', price: 7, art: 'suco', tone: 'laranja' },
  { id: 'b5', cat: 'bebidas', name: 'Kuat 2L', desc: 'refrigerante de guaraná, garrafa família', price: 12, art: 'garrafa', tone: 'verde' },
  { id: 'b6', cat: 'bebidas', name: 'Refrigerante São Geraldo 2L', desc: 'guaraná da casa, garrafa família', price: 13.5, art: 'garrafa', tone: 'vermelho' },
  { id: 'b7', cat: 'bebidas', name: 'Água com gás 350ml', desc: 'garrafa gelada', price: 2.2, art: 'agua' },

  /* — salgados — */
  { id: 'g1', cat: 'salgados', name: 'Risole de carne', desc: 'massa fina, carne temperada', price: 4, photo: 'risole' },
  { id: 'g2', cat: 'salgados', name: 'Esfirra de carne', desc: 'massa macia, carne com limão', price: 6, photo: 'esfirra-carne' },
  { id: 'g3', cat: 'salgados', name: 'Pastel de frango crocante', desc: 'frito na hora, massa crocante', price: 5.5, photo: 'pastel-frango' },
  { id: 'g4', cat: 'salgados', name: 'Combo eu mereço 1', desc: 'fatia de torta de limão + refri 250ml', price: 10, photo: 'combo-1', tag: 'combo' },
  { id: 'g5', cat: 'salgados', name: 'Combo eu mereço 2', desc: 'coxinha ou enroladinho + refri + pudim pequeno', price: 19, photo: 'combo-2', tag: 'combo' },
  { id: 'g6', cat: 'salgados', name: 'Mini salgado de queijo', desc: 'unidade, pra cento encomendado', price: 0.7, photo: 'mini-queijo' },
  { id: 'g7', cat: 'salgados', name: 'Esfirra de frango', desc: 'massa macia, frango desfiado', price: 6, art: 'esfirra' },
  { id: 'g8', cat: 'salgados', name: 'Coxinha de frango com bacon', desc: 'massa de batata, frango e bacon', price: 7.5, art: 'coxinha' },

  /* — bolos especiais — */
  { id: 'e1', cat: 'bolos-especiais', name: 'Bolo pudim', desc: 'bolo e pudim na mesma fatia — o inteiro', price: 67, photo: 'bolo-pudim', tag: 'a casa pede' },
  { id: 'e2', cat: 'bolos-especiais', name: 'Meio bolo pudim', desc: 'metade do bolo pudim', price: 38.5, photo: 'meio-bolo-pudim' },
  { id: 'e3', cat: 'bolos-especiais', name: 'Bolo indiano', desc: 'receita da casa, coco e especiarias', price: 50, art: 'bolo-indiano' },
  { id: 'e4', cat: 'bolos-especiais', name: 'Mini bolo de maracujá', desc: 'pequeno, pra matar a vontade', price: 15, art: 'mini-bolo', tone: 'amarelo' },

  /* — mercearia — */
  { id: 'm1', cat: 'mercearia', name: 'Casadinho amanteigado 100g', desc: 'biscoito de nata com doce', price: 11, photo: 'biscoito-casadinho' },
  { id: 'm2', cat: 'mercearia', name: 'Folheado salgado 300g', desc: 'pacote de folheado da casa', price: 11, photo: 'folheado-salgado' },
  { id: 'm3', cat: 'mercearia', name: 'Folheado doce 300g', desc: 'pacote de folheado da casa', price: 11, photo: 'folheado-doce' },
  { id: 'm4', cat: 'mercearia', name: 'Peta queijo 80g', desc: 'salgadinho de queijo, pacote', price: 11, photo: 'peta-queijo' }
];
