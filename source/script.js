class BackgroundTriangle {
    constructor(coordonates, angle, distance, z, velocity) {
        this.coo = new TriangleCoordonates(coordonates);
        this.angle = angle;
        this.dist = distance;
        this.z = z;
        this.prevScroll = window.scrollY;
        this.velocity = velocity * 8;
    }

    updatePos() {
        var delta = this.prevScroll - window.scrollY;
        this.prevScroll = window.scrollY;

        this.coo.update(delta / this.velocity);
        console.log(this.velocity)
        return this.coo.getStr();
    }
}

class TriangleCoordonates {
    constructor({ a = { x, y }, b = { x, y }, c = { x, y } }) {
        this.a = a;
        this.b = b;
        this.c = c;

        return undefined;
    }

    update(deltaY, deltaX = 0) {

        this.a.x += deltaX;
        this.b.x += deltaX;
        this.c.x += deltaX;

        this.a.y += deltaY;
        this.b.y += deltaY;
        this.c.y += deltaY;

        return undefined;
    }

    getStr() {
        var str = `${this.a.x},${this.a.y} ${this.b.x},${this.b.y} ${this.c.x},${this.c.y}`;
        return str;
    }
}

var background = document.getElementById("background");
var triangles = [];

for (var i = 5; i > 0; i--) {
    for (var j = 0; j < 9; j++) {
        var tmp = document.createElement("polygon");
        var x1, y1, x2, y2, x3, y3, alpha, alpha2, dist;

        x1 = Math.random() * 100 - 6;
        y1 = Math.random() * 100 - 6;
        alpha = Math.random() * Math.PI;
        dist = i * 4;
        x2 = Math.sin(alpha) * dist + x1;
        y2 = Math.cos(alpha) * dist + y1;
        alpha2 = (Math.PI / 3) * 2 + alpha;
        x3 = Math.sin(alpha2) * dist + x2;
        y3 = Math.cos(alpha2) * dist + y2;

        var a = x1 + ',' + y1;
        var b = x2 + ',' + y2;
        var c = x3 + ',' + y3;

        tmp.classList.add('background-triangle', 'triangle-z-' + i);
        tmp.setAttribute("points", a + ' ' + b + ' ' + c);
        tmp.style.fill = 'rgb(60, 0, 0)';
        tmp.style.filter = 'blur(' + (i / 3) ** 2 + 'px) saturate(' + (6 - i) + ')';

        var coordonates = {
            a: { x: x1, y: y1 },
            b: { x: x2, y: y2 },
            c: { x: x3, y: y3 }
        };

        triangles.push(
            new BackgroundTriangle(
                coordonates, alpha, dist, i, i
            )
        );

        background.appendChild(tmp);
    }
}
background.innerHTML += ' ';

function updateBackground(params) {
    var scrolled = window.scrollY;
    for (let i = 0; i < triangles.length; i++) {
        const tr = document.getElementsByClassName('background-triangle')[i]
        const element = triangles[i];
        tr.setAttribute("points", element.updatePos())
    }
}