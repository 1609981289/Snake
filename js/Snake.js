function Snake()
{
	//初始化蛇的身体 为3节 
	this.body = [
		{"row":3,"col":10},
		{"row":3,"col":11},
		{"row":3,"col":12}
		];
	this.direction = 'L'
	this.willDirection = 'D'
}

//蛇的运动
Snake.prototype.update = function()
{
	this.direction = this.willDirection
	switch(this.direction)
	{
		case 'L':
			//左走
			this.body.unshift({"row":this.body[0].row,"col":this.body[0].col-1})
			break
		case 'U':
			//上走
			this.body.unshift({"row":this.body[0].row-1,"col":this.body[0].col})
			break
		case 'R':
			//右走
			this.body.unshift({"row":this.body[0].row,"col":this.body[0].col+1})
			break
		case 'D':
			//下走
			this.body.unshift({"row":this.body[0].row+1,"col":this.body[0].col})
			break
	}
	
	//超出边缘死亡的判断
	if(this.body[0].col>game.col-1
	||this.body[0].col<0
	||this.body[0].row<0
	||this.body[0].row>game.row-1)
	{
		this.body.shift()
		clearInterval(game.timer)
		game.timer = 0
		game.continueButton.style.visibility = "hidden"
		game.stopButton.style.visibility = "hidden"
		game.gameStatus = "游戏结束!"
	}
	
	//自残死亡判断
	var i = 1;
	for(i = 1;i<this.body.length;i++)
	{
		if(this.body[0].row == this.body[i].row && this.body[0].col == this.body[i].col)
		{
			this.body.shift()
			clearInterval(game.timer)
			game.timer = 0
			game.continueButton.style.visibility = "hidden"
			game.stopButton.style.visibility = "hidden"
			game.gameStatus = "游戏结束!"
		}
	}
	
	//蛇吃事物 不删尾巴，等价于长身体
	if(this.body[0].row == game.food.row&&
	this.body[0].col == game.food.col)
	{
		//吃到一个食物，加5分
		game.score += 5
		game.length += 1
		//生成新的食物
		game.food = new Food(game)
		return
	}
	this.body.pop()	
}

			
//蛇的渲染
Snake.prototype.render = function()
{
	//渲染蛇头
	this.direction = this.willDirection
	switch(this.direction)
	{
		case 'L':
			game.setColor(this.body[0].row,this.body[0].col,"url(img/l_head.png)")
			break
		case 'U':
			game.setColor(this.body[0].row,this.body[0].col,"url(img/u_head.png)")
			break
		case 'R':
			game.setColor(this.body[0].row,this.body[0].col,"url(img/r_head.png)")
			break
		case 'D':
			game.setColor(this.body[0].row,this.body[0].col,"url(img/d_head.png)")
			break
	}
	
	//渲染蛇身
	var i = 1;
	for(i = 1;i < this.body.length;i++)
	{
		game.setColor(this.body[i].row,this.body[i].col,"url(img/body.png)")
	}
}

Snake.prototype.changeDirection = function(d)
{
	this.willDirection = d
}
