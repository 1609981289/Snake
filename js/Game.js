function Game(){
	//行数
	this.row = 20;
	//列数
	this.col = 20;
	//初始化节点
	this.init();
	//初始化计分面板
	this.showMsg()
	//实例化蛇类
	this.snake = new Snake()
	//实例化事物
	this.food = new Food(this)
	//执行定时器任务
	this.start()
	//键盘监听事件 
	this.bindEvent()
	//记录分数
	this.score = 0
	//记录长度
	this.length = 3
	//游戏状态
	this.gameStatus = "游戏中..."
}

//游戏网格制作
Game.prototype.init = function() {
	this.dom = document.createElement("table")
	var tr,td;
	//遍历行和列上树
	for(var i = 0;i<this.row;i++)
	{
		tr = document.createElement("tr");
		for(var j = 0;j<this.col;j++)
		{
			td = document.createElement("td");
		
			tr.appendChild(td);
		}
		this.dom.appendChild(tr);
	}
	
	//表格上树
	document.getElementById("app").appendChild(this.dom);
}

//生成计分面板
Game.prototype.showMsg = function()
{
	//分数
	this.score_text = document.createElement("p")
	
	//长度
	this.snakeLength = document.createElement("p")
	
	//重来按钮
	this.resetButton = document.createElement("button")
	this.resetButton.innerHTML = "重新开始"
	this.resetButton.onclick = function()
	{
		game.score = 0
		game.length = 3
		game.snake = new Snake()
		if(game.timer == 0)
		{
			game.start()
		}else
		{
			setInterval(game.timer,200)	
		}
		stopB.style.visibility = "visible"
		game.gameStatus = "游戏中..."
	}
	
	//暂停
	this.stopButton = document.createElement("button")
	this.stopButton.innerHTML = "暂停"
	
	//继续
	this.continueButton = document.createElement("button")
	this.continueButton.innerHTML = "继续"
	this.continueButton.style.position = "relative"
	this.continueButton.style.bottom = "70px"
	this.continueButton.style.visibility = "hidden"
	
	var stopB = this.stopButton
	var continueB = this.continueButton
	
	this.stopButton.onclick = function()
	{
		clearInterval(game.timer)
		game.timer = 0
		stopB.style.visibility = "hidden"
		continueB.style.visibility = "visible"
	}
	
	this.continueButton.onclick = function()
	{
		if(game.timer == 0)
		{
			game.start()
		}else
		{
			setInterval(game.timer,200)	
		}
		stopB.style.visibility = "visible"
		continueB.style.visibility = "hidden"
	}
	
	//游戏状态
	this.gameStatus = "游戏中..."
	this.gameStatusText = document.createElement("p")
	var gameStatusText = this.gameStatusText
	gameStatusText.style.marginTop = "0px"
	gameStatusText.style.marginBottom = "0px"
	
	//音乐
	musicButton = document.createElement("button")
	musicButton.innerHTML = "打开音乐"
	musicButton.style.backgroundImage = "url(img/bg_music.png)"
	musicButton.style.position = "relative"
	musicButton.style.left = "10px"
	musicButton.style.height = "50px"
	musicButton.style.width = "50px"
	musicButton.onclick = function()
	{
		var music = document.getElementById("bgmusic")
		if(music.paused)
		{
			music.play()
		}else
		{
			music.pause()
		}
	}
	
	//音量
	this.volumeInput = document.createElement("input")
	var volumeInput = this.volumeInput
	volumeInput.type = "range"
	volumeInput.style.marginLeft = "50px"
	
	document.getElementById("showMsg").appendChild(this.score_text)
	document.getElementById("showMsg").appendChild(this.snakeLength)
	document.getElementById("showMsg").appendChild(this.resetButton)
	document.getElementById("showMsg").appendChild(this.stopButton)
	document.getElementById("showMsg").appendChild(this.continueButton)
	document.getElementById("showMsg").appendChild(gameStatusText)
	document.getElementById("showMsg").appendChild(musicButton)
	document.getElementById("showMsg").appendChild(volumeInput)
}

//清屏
Game.prototype.clear = function()
{
	var i = 0;
	var j = 0;
	for(i = 0;i<this.row;i++)
	{
		for(j = 0;j<this.col;j++)
		{
			this.dom.getElementsByTagName("tr")[i].getElementsByTagName("td")[j].style.background = "grey"
		}
	}
}

//设置蛇的颜色
Game.prototype.setColor = function(row,col,url)
{
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundImage = url
}

//渲染事物
Game.prototype.setHtml = function(row,col,url)
{
	this.dom.getElementsByTagName("tr")[row].getElementsByTagName("td")[col].style.backgroundImage = url
}

Game.prototype.setMsg = function()
{
	this.score_text.innerHTML = "分数:"+this.score
	this.snakeLength.innerHTML = "长度:"+this.length
	this.gameStatusText.innerHTML = this.gameStatus
}

Game.prototype.setVolume = function()
{
	var music = document.getElementById("bgmusic")
	music.volume = this.volumeInput.value/100
}

//设置键盘的事件监听
Game.prototype.bindEvent = function()
{
	var self = this;
	document.onkeydown = function(event)
	{
		switch(event.keyCode)
		{
			case 38:
				if(self.snake.direction != 'D')
					self.snake.changeDirection('U')
				break	
			case 39:	
				if(self.snake.direction!='L')
					self.snake.changeDirection('R')
				break	
			case 40:
				if(self.snake.direction!='U')
					self.snake.changeDirection('D')
				break	
			case 37:
				if(self.snake.direction!='R')
					self.snake.changeDirection('L')
				break	
		}
	}
}

Game.prototype.start = function()
{
	//定时器，异步线程
	this.timer = setInterval(function()
	{	
		//清屏
		game.clear()
		//渲染蛇
		game.snake.render()
		//渲染食物
		game.food.render()
		//蛇的移动
		game.snake.update()
		//显示计分面板
		game.setMsg()
	},200)
}

this.MusicTimer = setInterval(function()
{
	//设置音量
		game.setVolume()
},200)
