$(document).ready(function () {

    con.add.lab_4 = new process();
    con.add.lab_4.prepare = function () {
        $('.console').prepend('<div class="description">Enter your number to get algebraic sum of elements from 1 to {your number} according to the formula: sqrt(pow(i, -i)). Have fun:)</div>');
        $('.console').prepend('<div class="title">Lab 4: Console</div>');

        con.writeConsole('Enter your number');
    };
    con.add.lab_4.execute = function () {
        if (isNaN(con.commandBuffer)) {
            con.writeConsole('Error! Result is NaN.');
            con.writeConsole();
            con.setCommandBuffer();
            con.writeConsole('Enter your number');
            return;
        }

        var result = 0;

        for (var i = 1; i <= con.commandBuffer; i++) {
            result += Math.sqrt(Math.pow(i, -i));
        }

        con.writeConsole('Result is: ' + result);
        con.writeConsole();
        con.setCommandBuffer();
        con.writeConsole('Enter your number:');

    };
    con.add.lab_4.help = "Enters the main console program.";

    con.add.calculator = new process();
    con.add.calculator.prepare = function () {
        $('.console').prepend('<div class="description">Enter string, like {number1} {+, -, *, /} {number2}.</div>');
        $('.console').prepend('<div class="title">Calculator: Console</div>');

        con.writeConsole('Enter the row for the calculation:');
    };
    con.add.calculator.execute = function () {
        var elements = con.commandBuffer.split(' ', 3);

        var result = 0;

        switch(elements[1]) {
            case "+":
                result = +elements[0] + +elements[2];
                break;
            case "-":
                result = +elements[0] - +elements[2];
                break;
            case "*":
                result = +elements[0] * +elements[2];
                break;
            case "/":
                result = +elements[0] / +elements[2];
                break;
        }

        con.writeConsole('Result is:'+result);
        con.writeConsole();
        con.setCommandBuffer();
        con.writeConsole('Enter the row for the calculation:');

    };
    con.add.calculator.help = "Do mathematics operations.";

    con.add.Ionelka = new process();
    con.add.Ionelka.prepare = function () {
        $('.console').prepend('<div class="description">Enter "Ionelka" to see something.</div>');
        $('.console').prepend('<div class="title">Ionelka: Console</div>');

        con.writeConsole('Enter your text');
    };
    con.add.Ionelka.execute = function () {

        if (con.commandBuffer === 'Ionelka') {
            con.writeConsole('Ionelka - the best starosta in the world!');
        } else {
            con.writeConsole('Error! What is this?');
        }

        con.writeConsole();
        con.setCommandBuffer();
        con.writeConsole('Enter your text');

    };
    con.add.Ionelka.help = "Display some cool staff.";
});