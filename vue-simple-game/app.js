new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: [],
  },
  methods: {
    calculateDamage: function(min, max) {
      return Math.max(
        Math.floor(
          Math.random() * max + 1
        ) , min
      );
    },
    startGame: function () {
      this.gameIsRunning = true;
      this.monsterHealth = 100;
      this.playerHealth = 100;

      this.turns = [];
    },
    attack: function () {
      var damage = this.calculateDamage(3, 10)
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hit monster for ' + damage
      });

      this.monsterHealth -= damage;

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    specialAttack: function () {
      var damage = this.calculateDamage(10, 20);
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hit monster hard for ' + damage
      });

      this.monsterHealth -= damage;

      if (this.checkWin()) {
        return;
      }

      this.monsterAttack();
    },
    heal: function () {
      if (this.playerHealth <= 90)
        this.playerHealth += 10;
      else
        this.playerHealth = 100;

      this.turns.unshift({
        isPlayer: true,
        text: 'Player heals for 10'
      });

      this.monsterAttack();
    },
    giveUp: function () { this.gameIsRunning = false; },
    checkWin: function () {
      if (this.monsterHealth <= 0) {
        if(confirm('You win. New Game ?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if(confirm('You lost. New Game ?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    monsterAttack: function() {
      var damage = this.calculateDamage(5, 12);
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hit player for ' + damage
      });

      this.playerHealth -= damage;
      this.checkWin();
    }
  },
});