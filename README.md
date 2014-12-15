beta.js
=======

Plot beta distribution using javascript and google charts

[Check the demo](http://allenday.github.io/beta.js/beta.html).

Here's the code:

```html
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <title>beta demo</title>
  <script type='text/javascript' src='beta.js'></script>
</head>
<body>
  <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart']}]}"></script>

</body>
  <div><div>5.1</div><div id="5.1" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>4.1</div><div id="4.1" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>3.1</div><div id="3.1" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>2.1</div><div id="2.1" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>1.1</div><div id="1.1" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>1.2</div><div id="1.2" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>1.3</div><div id="1.3" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>1.4</div><div id="1.4" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>1.5</div><div id="1.5" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>2.5</div><div id="2.5" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>3.5</div><div id="3.5" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>4.5</div><div id="4.5" style="width: 200px; height: 50px;"></div></div><br/>
  <div><div>5.5</div><div id="5.5" style="width: 200px; height: 50px;"></div></div><br/>

  <script type='text/javascript'>
  plotBetaPDF('5.1',5,1,0,1,0.01);
  plotBetaPDF('4.1',4,1,0,1,0.01);
  plotBetaPDF('3.1',3,1,0,1,0.01);
  plotBetaPDF('2.1',2,1,0,1,0.01);
  plotBetaPDF('1.1',1,1,0,1,0.01);
  plotBetaPDF('1.2',1,2,0,1,0.01);
  plotBetaPDF('1.3',1,3,0,1,0.01);
  plotBetaPDF('1.4',1,4,0,1,0.01);
  plotBetaPDF('1.5',1,5,0,1,0.01);
  plotBetaPDF('2.5',2,5,0,1,0.01);
  plotBetaPDF('3.5',3,5,0,1,0.01);
  plotBetaPDF('4.5',4,5,0,1,0.01);
  plotBetaPDF('5.5',5,5,0,1,0.01);
  </script>
</html>
```
