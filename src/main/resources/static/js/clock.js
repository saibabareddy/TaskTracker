window.addEventListener('load', eventWindowLoaded, false);

		var Debugger = function () {};

		Debugger.log = function (message) {
			try {
				console.log(message);
			} catch (exception) {
				return;
			}
		}

		function eventWindowLoaded () {
			canvasApp();
		}

		function canvasApp () {
			
			Debugger.log('Drawing Canvas');

			
			var canvas;
			
			function initDrawCanvas(canvas, ctx){
				this.canvas = canvas;
				this.ctx = ctx;
			}

			
			function drawRect(x, y, width, height, isClear, isFill, color) {
				
				if (isClear) {
					ctx.clearRect(x, y, width, height);
				} else {
					if (isFill) {
						ctx.fillStyle = color;
						ctx.fillRect(x, y, width, height);
					} else {
						ctx.strokeStyle = color;
						ctx.strokeRect(x, y, width, height);
					}
				}
			}

			
			function drawArc(x, y, radius, startAngle, endAngle, anticlockwise, isOnlyArc, isFill, color) {
				if (isFill) {
					ctx.fillStyle = color;
					ctx.beginPath();
					ctx.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), anticlockwise);
					ctx.closePath();
					ctx.fill();
				} else {
					ctx.strokeStyle = color;
					ctx.beginPath();
					ctx.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), anticlockwise);
					if (isOnlyArc) {

					} else {
						ctx.closePath();
					}
					ctx.stroke();
				}
			} 

			// 将角度转换为弧度
			// @param {Number} deg - 角度值
			function getAngle(deg) {
				return Math.PI *  deg / 180;
			}

	
			function drawSector(x, y, radius, startAngle, endAngle, anticlockwise, isFill, color) {
				ctx.beginPath();
				ctx.moveTo(x, y);
				ctx.arc(x, y, radius, getAngle(startAngle), getAngle(endAngle), false);
				ctx.closePath();
					
				if (isFill) {
					ctx.fillStyle = color;
					ctx.fill();
				} else {
					ctx.strokeStyle = color;
					ctx.stroke();
				}
			}

		
			function drawRoundedRect(x, y, width, height, radius, isFill, color) {
				ctx.beginPath();
				ctx.moveTo(x + radius, y);
				ctx.arcTo(x + width, y, x + width, y + radius, radius);
				ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
				ctx.arcTo(x, y + height, x, y + height - radius, radius);
				ctx.arcTo(x, y, x + radius, y, radius);
				ctx.closePath();
					
				if (isFill) {
					ctx.fillStyle = color;
					ctx.fill();
				} else {
					ctx.strokeStyle = color;
					ctx.stroke();
				}
			}

		
			function drawSolidLine(startX, startY, endX, endY, lineWidth, color){
				ctx.save();
				ctx.strokeStyle = color;
				ctx.lineWidth = lineWidth;
				ctx.beginPath();
				ctx.moveTo(startX, startY);
				ctx.lineTo(endX, endY);
				ctx.stroke();
				ctx.restore();
			}

			
			function drawDashLine(startX, startY, endX, endY, setLineDash, lineWidth, color) {
				ctx.save();
				ctx.lineWidth = lineWidth;
				ctx.strokeStyle = color;
				ctx.beginPath();
				ctx.setLineDash(setLineDash);				
				ctx.moveTo(startX, startY);
				ctx.lineTo(endX, endY);
				ctx.closePath();
				ctx.stroke();
				ctx.restore();
			} 

			
			function drawDottedLine(startX, startY, endX, endY, radius, interval, color) {
				if (!interval) {
					interval = 5;
				}
				var isHorizontal = true;
				if (startX == endX) {
					isHorizontal = false;
				}

				var len = isHorizontal ? endX - startX : endY - startY;

				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.fillStyle = color;
				ctx.moveTo(startX, startY);
				var progress = 0;
				while (len > progress) {
					progress += interval;

					if (progress > len) {
						progress = len;
					}

					if (isHorizontal) {
						ctx.moveTo(startX + progress, startY);
						ctx.arc(startX + progress, startY, radius, 0, Math.PI * 2, true);
						ctx.fill();
					} else {
						ctx.moveTo(startX, endX + progress);
						ctx.arc(startX, startY + progress, radius, 0, Math.PI * 2, true);
						ctx.fill();
					}
				}
			}

			// From:
			// http://www.dbp-consulting.com/tutorials/canvas/CanvasArrow.html
  			// Draw arrow head
			function drawHead (x0, y0, x1, y1, x2, y2, style, color, width) {
				if (typeof(x0) == 'string') {
					x0 = parseInt(x0);
				}
				if (typeof(y0) == 'string') {
					y0 = parseInt(y0);
				}
				if (typeof(x1) == 'string') {
					x1 = parseInt(x1);
				}
				if (typeof(y1) == 'string') {
					y1 = parseInt(y1);
				}
				if (typeof(x2) == 'string') {
					x2 = parseInt(x2);
				}
				if (typeof(y2) == 'string') {
					y2 = parseInt(y2);
				}
				
				var radius = 3,
					twoPI = 2 * Math.PI;
				
				ctx.save();
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.fillStyle = color;
				ctx.lineWidth = width;
				ctx.moveTo(x0, y0);
				ctx.lineTo(x1, y1);
				ctx.lineTo(x2, y2);
				
				switch (style) {
					case 0:
						var backdist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
						ctx.arcTo(x1, y1, x0, y0, .55 * backdist);
						ctx.fill();
						break;
					case 1:
						ctx.beginPath();
						ctx.moveTo(x0, y0);
						ctx.lineTo(x1, y1);
						ctx.lineTo(x2, y2);
						ctx.lineTo(x0, y0);
						ctx.fill();
						break;
					case 2:
						ctx.stroke();
						break;
					case 3:
						var cpx = (x0 + x1 + x2) / 3;
						var cpy = (y0 + y1 + y2) / 3;
						ctx.quadraticCurveTo(cpx, cpy, x0, y0);
						ctx.fill();
						break;
					case 4:
						var cp1x, cp1y, cp2x, cp2y, backdist;
						var shiftamt = 5;
						if (x2 == x0) {
							backdist = y2 - y0;
							cp1x = (x1 + x0) / 2;
							cp2x = (x1 + x0) / 2;
							cp1y = y1 + backdist / shiftamt;
							cp2y = y1 - backdist / shiftamt;
						} else {
							backdist = Math.sqrt(((x2 - x0) * (x2 - x0)) + ((y2 - y0) * (y2 - y0)));
							var xback = (x0 + x2) / 2;
							var yback = (y0 + y2) / 2;
							var xmid = (xback + x1) / 2;
							var ymid = (yback + y1) / 2;
							var m = (y2 - y0) / (x2 - x0);
							var dx = (backdist / (2 * Math.sqrt(m * m + 1))) / shiftamt;
							var dy = m * dx;
							cp1x = xmid - dx;
							cp1y = ymid - dy;
							cp2x = xmid + dx;
							cp2y = ymid + dy;
						}
						ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x0, y0);
						ctx.fill();
						break;
					}
					ctx.restore();
			}
			
  			// draw arrow
			function drawArrow(x1, y1, x2, y2, style, which, angle, d, color, width) {
				if (typeof(x1) == 'string') {
					x1 = parseInt(x1);
				}
				if (typeof(y1) == 'string') {
					y1 = parseInt(y1);
				}
				if (typeof(x2) == 'string') {
					x2 = parseInt(x2);
				}
				if (typeof(y2) == 'string') {
					y2 = parseInt(y2);
				}
				style = typeof(style) != 'undefined' ? style : 3;
				which = typeof(which) != 'undefined' ? which : 1;
				angle = typeof(angle) != 'undefined' ? angle : Math.PI / 9;
				d = typeof(d) != 'undefined' ? d : 10;
				color = typeof(color) != 'undefined' ? color : '#000';
				width = typeof(width) != 'undefined' ? width : 1;
				var toDrawHead = typeof(style) != 'function' ? drawHead : style;
				var dist = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
				var ratio = (dist - d / 3) / dist;
				var tox, toy, fromx, fromy;
				if (which & 1) {
					tox = Math.round(x1 + (x2 - x1) * ratio);
					toy = Math.round(y1 + (y2 - y1) * ratio);
				} else {
					tox = x2;
					toy = y2;
				}
				
				if (which & 2) {
					fromx = x1 + (x2 - x1) * (1 - ratio);
					fromy = y1 + (y2 - y1) * (1 - ratio);
				} else {
					fromx = x1;
					fromy = y1;
				}
				
				ctx.beginPath();
				ctx.strokeStyle = color;
				ctx.lineWidth = width;
				ctx.moveTo(fromx, fromy);
				ctx.lineTo(tox, toy);
				ctx.stroke();
				
				var lineangle = Math.atan2(y2 - y1, x2 - x1);
				var h = Math.abs(d / Math.cos(angle));
				if (which & 1) {
					var angle1 = lineangle + Math.PI + angle;
					var topx = x2 + Math.cos(angle1) * h;
					var topy = y2 + Math.sin(angle1) * h;
					var angle2 = lineangle + Math.PI - angle;
					var botx = x2 + Math.cos(angle2) * h;
					var boty = y2 + Math.sin(angle2) * h;
					toDrawHead(topx, topy, x2, y2, botx, boty, style, color, width);
				}
				
				if (which & 2) {
					var angle1 = lineangle + angle;
					var topx = x1 + Math.cos(angle1) * h;
					var topy = y1 + Math.sin(angle1) * h;
					var angle2 = lineangle - angle;
					var botx = x1 + Math.cos(angle2) * h;
					var boty = y1 + Math.sin(angle2) * h;
					toDrawHead(topx, topy, x1, y1, botx, boty, style, color, width);
				}
			}
  
			// draw arced arrow
			function drawArcedArrow(x, y, r, startangle, endangle, anticlockwise, style, which, angle, d, color, width) {
				style = typeof(style) != 'undefined' ? style : 3;
				which = typeof(which) != 'undefined' ? which : 1;
				angle = typeof(angle) != 'undefined' ? angle : Math.PI / 8;
				d = typeof (d) != 'undefined' ? d : 10;
				color = typeof(color) != 'undefined' ? color : '#000';
				width = typeof(width) != 'undefined' ? width : 1;
				
				ctx.save();
				ctx.beginPath();
				ctx.lineWidth = width;
				ctx.strokeStyle = color;
				ctx.arc(x, y, r, startangle, endangle, anticlockwise);
				ctx.stroke();
				var sx, sy, lineangle, destx, desty;
				ctx.strokeStyle = 'rgba(0,0,0,0)';
				if (which & 1) {
					sx = Math.cos(startangle) * r + x;
					sy = Math.sin(startangle) * r + y;
					lineangle = Math.atan2(x - sx, sy - y);
					if (anticlockwise) {
						destx = sx + 10 * Math.cos(lineangle);
						desty = sy + 10 * Math.sin(lineangle);
					} else {
						destx = sx - 10 * Math.cos(lineangle);
						desty = sy - 10 * Math.sin(lineangle);
					}
					drawArrow(sx, sy, destx, desty, style, 2, angle, d, color, width);
				}
				
				if (which & 2) {
					sx = Math.cos(endangle) * r + x;
					sy = Math.sin(endangle) * r + y;
					lineangle = Math.atan2(x - sx, sy - y);
					if (anticlockwise) {
						destx = sx - 10 * Math.cos(lineangle);
						desty = sy - 10 * Math.sin(lineangle);
					} else {
						destx = sx + 10 * Math.cos(lineangle);
						desty = sy + 10 * Math.sin(lineangle);
					}
					drawArrow(sx, sy, destx, desty, style, 2, angle, d, color, width);
				}
				ctx.restore();
			}

			
			function drawStarPolygons(xCenter, yCenter, radius, sides, sideIndent, alpha, isFill, color) {
				
				var sideIndentRadius = radius * (sideIndent || 0.38);
				var radAngle = alpha ? alpha * Math.PI / 180 : -Math.PI / 2;
				var radAlpha = Math.PI * 2 / sides / 2;

				ctx.save();
				ctx.beginPath();

				var xPos = xCenter + Math.cos(radAngle) * radius;
				var yPos = yCenter + Math.sin(radAngle) * radius;

				ctx.moveTo(xPos, yPos);

				for (var i = 1; i <= sides * 2; i++) {
					var rad = radAlpha * i + radAngle;
					var len = (i % 2) ? sideIndentRadius : radius;
					var xPos = xCenter + Math.cos(rad) * len;
					var yPos = yCenter + Math.sin(rad) * len;

					ctx.lineTo(xPos, yPos);

				}

				ctx.closePath();

				if (isFill) {
					ctx.fillStyle = color;
					ctx.fill();
				} else {
					ctx.strokeStyle = color;
					ctx.stroke();
				}
			}


			var canvas = document.getElementById('canvasOne');
			var ctx = canvas.getContext('2d');
			var w = canvas.width = window.innerWidth;
			var h = canvas.height = window.innerHeight;
			initDrawCanvas(canvas, ctx);

			
			
			var radius = 150;
			var handTruncation = canvas.width / 25;
			var	hourHandTruncation = canvas.width / 10;
			
			
			function drawClockFace() {
				
				ctx.lineWidth = 4;
				ctx.translate(w / 2, h / 2);
				
				drawArc(0, 0, radius, 0, 360, true, true, false, '#000');
				drawArc(0, 0, 10, 0, 360, true, true, true, '#000');

				
				
				for (var i = 0; i < 60; i++) {
					var rad = getAngle(i * 6);
					ctx.save();
					ctx.rotate(rad);
					if (i % 5 === 0) {
						drawSolidLine(radius - 15, -1, radius - 4, -1, 4, '#000');
						
					} else {
						drawSolidLine(radius - 8, -1, radius - 4, -1, 2, '#999');					
					}
					ctx.restore();
				}
				
				
				ctx.font = radius * 0.15 + "px arial";
				ctx.textBaseline = "middle";
				ctx.textAlign = "center";
				for (var i = 1; i < 13; i++) {
					var ang = getAngle(30 * i);
					ctx.fillText(i.toString(), radius * 0.80 * Math.sin(ang), -radius * 0.80 * Math.cos(ang));
				}

			}

			function drawHand(angle, length, width, color) {
				var endX = Math.sin(angle) * length;
				var endY = -Math.cos(angle) * length;
				ctx.lineCap = 'round';
				drawSolidLine(0, 0, endX, endY, width, color);
			}
			
			function drawHands(radius) {
				var now = new Date();
				var hour = now.getHours();
				var minute = now.getMinutes();
				var second = now.getSeconds();

				hour = hour % 12;
				hour = getAngle(30) * hour + getAngle(30) * minute / 60 + getAngle(30) * second / 3600;
				minute = Math.PI / 30 * minute + second * Math.PI / 1800;
				second = Math.PI / 30 * second;
				drawHand(hour, radius * 0.4, radius * 0.07); // 时针
				drawHand(minute, radius * 0.6, radius * 0.05); // 分针
				drawHand(second, radius * 0.7, radius * 0.03, 'red'); // 秒针
			}
			
			function drawClock() {
				ctx.resetTransform();
				drawRect(0, 0, w, h, true);
				drawClockFace();
				drawHands(radius);
			}
			setInterval(drawClock, 1000);
			
		}