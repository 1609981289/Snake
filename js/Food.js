function Food(game)
{
	var i = 0
	while(true)
	{
		this.isInSnake = false
		this.row = parseInt(Math.random() * game.row)
		this.col = parseInt(Math.random() * game.col)
		for(i = 0;i<game.snake.body.length;i++)
		{
			if(game.snake.body[0].row == this.row&&
				game.snake.body[0].col == this.col)
			{
				this.isInSnake = true
				break
			}
		}	
		if(this.isInSnake == false)
		{
			break	
		}
	}
}

Food.prototype.render = function()
{
	game.setHtml(this.row,this.col,"url(img/food.png)")
}
