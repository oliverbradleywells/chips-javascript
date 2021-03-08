class Game {
    constructor(width, height, interval = 1000, pointsLimit = 10) {
        this.score = 0
        this.interval = interval
        this.pointsLimit = pointsLimit
        this.width = width
        this.height = height
        this.widthLimit = width - 60
        this.heightLimit = height - 60
        this.chips = []
        this.board = this._createBoard()
        this.timeoutId = null
    }
    _createBoard() {
        const div = document.createElement('div')
        div.style.width = this.width + 'px'
        div.style.height = this.height + 'px'
        div.style.border = '1px solid red';
        return div
    }
    reset() {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId)
        }
        this.chips.forEach(chip => {
            chip.destroy()
        })
        this.score = 0
        this.updateScore()
    }
    run() {
        this.timeoutId = setTimeout(() => {
            console.log(123)
            const chip = new Chip(this)
            this.chips.push(chip)
            this.run()
        }, this.interval)
    }
    earnPoints(points) {
        this.score += points
        this.updateScore()
    }
    updateScore() {
        document.querySelector('#score').textContent = `score: ${this.score}`
    }
    renderTo(element) {
        element.appendChild(this.board)
    }
}





class Chip {
    constructor(game) {
        this.game = game
        this.points = Math.floor(Math.random() * game.pointsLimit)
        this.chip = this._createChip(
            game.widthLimit,
            game.heightLimit
        )

        this.game.board.appendChild(this.chip)
    }
    _createChip(widthLimit, heightLimit) {
        const chip = document.createElement('div')
        chip.className = 'chip'
        chip.style.left = Math.floor(Math.random() * widthLimit) + 'px'
        chip.style.top = Math.floor(Math.random() * heightLimit) + 'px'
        chip.textContent = this.points
        chip.addEventListener('click', () => {
            this.destroy()
        })
        return chip
    }
    destroy() {
        this.chip.remove()
        this.game.earnPoints(this.points)
    }
}






const game = new Game(300, 300, 1000)
game.renderTo(document.body)

document.querySelector('#start-button').addEventListener('click', () => {
    game.run()
})

document.querySelector('#reset-button').addEventListener('click', () => {
    game.reset()
})


