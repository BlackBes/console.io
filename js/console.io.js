var con = {};

con.iterupt = 0;
con.closing = 0;
con.commandBuffer = '';
con.commandPointer = -1;
con.process = '';

con.bufferhistory = [];
con.bufferPointer = -1;
con.bufferTemp = '';
con.commandTemp = '';

con.addCommandBuffer = function (key) {
    function spliceSlice(str, index, count, add) {
        if (index < 0) {
            index = str.length + index;
            if (index < 0) {
                index = 0;
            }
        }
        return str.slice(0, index + 1) + add + str.slice(index + count);
    }

    var str = $('p').last().text();
    var sysLength = str.length - con.commandBuffer.length;

    str = spliceSlice(str, sysLength + con.commandPointer, 1, key);
    con.commandBuffer = spliceSlice(con.commandBuffer, con.commandPointer, 1, key);
    con.commandPointer = con.commandPointer + 1;

    $('p').last().empty();
    $('p').last().append(str);
};

con.setCommandBuffer = function (key) {
    if (key === undefined || key === '') {
        con.commandBuffer = '';
    } else {
        con.commandBuffer = key;
    }
    con.commandPointer = con.commandBuffer.length - 1;
    $('.pointer').css('margin-left', '0px');
};

con.setHistory = function (action) {
    con.bufferPointer = -1;
    if (con.bufferhistory.length < 10) {
        con.bufferhistory.unshift(action);
    } else {
        con.bufferhistory.unshift(action);
        con.bufferhistory.pop();
    }
};

con.add = {};

var process = function () {
    this.prepare = function () {

    };
    this.execute = function () {

    };
    this.start = function () {
        con.iterupt = 1;
        con.writeConsole();

        this.prepare();
    };
    this.update = function (key) {

        if (key === 'ArrowUp') {
            con.historyUp();
            return;
        }

        if (key === 'ArrowDown') {
            con.historyDown();
            return;
        }

        if (key === 'ArrowLeft') {
            con.pointerLeft();
            return;
        }

        if (key === 'ArrowRight') {
            con.pointerRight();
            return;
        }

        if (key === 'Backspace') {
            con.backspace();
            return;
        }

        if (key === 'Tab') {
            con.tabFinder();
            return;
        }

        if (key === 'Enter') {
            if (con.commandBuffer !== '') {
                con.setHistory(con.commandBuffer);

                switch (con.commandBuffer) {
                    case 'clear':
                        $(".row").remove();
                        con.writeConsole();
                        con.setCommandBuffer();
                        return;
                        break;
                    case 'exit':
                        con.iterupt = 0;
                        con.setCommandBuffer();

                        $('.console').find('div').first().remove();
                        $('.console').find('div').first().remove();

                        con.writeConsole();
                        con.writeConsole();
                        return;
                        break;
                }
                this.execute();
            }
        } else {
            if (key.length === 1) {
                var line = con.addCommandBuffer(key);
                $('p').last().append(line);
            }
        }
    };
    this.help = '';
};

con.backspace = function () {

    function spliceSlice(str, index, count) {
        if (index < 0) {
            index = str.length + index;
            if (index < 0) {
                index = 0;
            }
        }
        return str.slice(0, index) + str.slice(index + count);
    }

    var str = $('p').last().text();
    var sysLength = str.length - con.commandBuffer.length;
    if (con.commandBuffer.length > 0) {
        if (con.commandPointer >= 0) {
            str = spliceSlice(str, sysLength + con.commandPointer, 1);
            con.commandBuffer = spliceSlice(con.commandBuffer, con.commandPointer, 1);
            con.commandPointer = con.commandPointer - 1;
            $('p').last().empty();
            $('p').last().append(str);
        }
    }
};

con.historyUp = function () {
    if (con.bufferPointer === -1) {
        con.commandTemp = con.commandBuffer;
        con.bufferTemp = con.commandBuffer;
    }

    if (con.bufferhistory.length === 0) {
        return;
    }

    if (con.bufferPointer <= (con.bufferhistory.length - 2)) {
        con.bufferPointer++;
    }

    var comString = $('p').last().text();

    comString = comString.slice(0, comString.length - con.bufferTemp.length);
    comString += con.bufferhistory[con.bufferPointer];

    con.bufferTemp = con.bufferhistory[con.bufferPointer];

    $('p').last().empty();
    $('p').last().append(comString);

    con.setCommandBuffer(con.bufferTemp);
};

con.historyDown = function () {

    if (con.bufferPointer > -1) {
        con.bufferPointer--;
    }

    if (con.bufferPointer === -1) {
        con.setCommandBuffer(con.commandTemp);
    }

    var comString = $('p').last().text();

    comString = comString.slice(0, comString.length - con.bufferTemp.length);


    if (con.bufferPointer === -1) {
        comString += con.commandBuffer;
        con.bufferTemp = con.commandTemp;
    } else {
        comString += con.bufferhistory[con.bufferPointer];
        con.bufferTemp = con.bufferhistory[con.bufferPointer];
    }

    $('p').last().empty();
    $('p').last().append(comString);

    con.setCommandBuffer(con.bufferTemp);
};

con.pointerLeft = function () {
    if (con.commandPointer >= 0) {
        con.commandPointer--;
        console.log(con.commandBuffer.length - 1 - con.commandPointer);
        var displacement = -((con.commandBuffer.length - 1 - con.commandPointer) * 8.8);
        $('.pointer').css('margin-left', displacement + 'px');
    }
};

con.pointerRight = function () {
    if (con.commandPointer < con.commandBuffer.length - 1) {
        con.commandPointer++;
        console.log(con.commandBuffer.length - 1 - con.commandPointer);
        var displacement = -((con.commandBuffer.length - 1 - con.commandPointer) * 8.8);
        $('.pointer').css('margin-left', displacement + 'px');
    }
};

con.tabFinder = function () {
    var commands = [];
    if (con.iterupt !== 1) {
        commands = ['exit', 'help', 'info', 'clear', 'ls'];
        var counter = 0;
        for (var process in con.add) {
            if (con.add.hasOwnProperty(process)) {
                var name = Object.keys(con.add)[counter];
                commands.push(name);
                counter++;
            }
        }
    } else {
        commands = ['exit', 'clear', 'ls'];
    }

    var findNames = [];
    var finds = 0;
    for (var i = 0; i < commands.length; i++) {
        var index = commands[i].indexOf(con.commandBuffer);

        if (index === 0) {
            findNames.push(commands[i]);
            finds++;
        }
    }

    if (finds === 1) {
        var comString = $('p').last().text();
        comString = comString.slice(0, comString.length - con.commandBuffer.length);

        con.commandBuffer = findNames[0];
        con.commandPointer = con.commandBuffer.length;
        $('p').last().empty();
        $('p').last().append(comString + con.commandBuffer);
        $('.pointer').css('margin-left', '0px');
    }

};

con.check = function (name) {
    if (con.add.hasOwnProperty(name)) {
        return true;
    } else {
        return undefined;
    }
};

con.writeConsole = function (str) {
    str = typeof str !== 'undefined' ? str : '';

    var space = '';
    if (str !== '') {
        space = ' ';
    }

    if ($('.pointer').length > 0) {
        $('.pointer').remove();
    }

    if (this.iterupt) {
        $('.console').append('<div class="row"><p>' + this.process + '>' + space + str + '&nbsp</p><span class="pointer"></span></div>');
    } else {
        $('.console').append('<div class="row"><p>>' + space + str + '&nbsp</p><span class="pointer"></span></div>');
    }

    $('html, body').animate({
        scrollTop: $("p").last().offset().top
    }, 1);

};


con.main = function () {
    this.writeConsole();
    $(document).keydown(function (event) {
        //console.log(event.key);
        if (event.key === 'Backspace' || event.key === '\'' || event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Tab') {
            event.preventDefault();
        }
        if (con.iterupt) {

            if (con.check(con.process) !== undefined) {
                var key = event.key;
                var slash = '';
                if (event.key === '\'') {
                    slash = '\\';
                }

                eval('con.add.' + con.process + '.update(\'' + slash + key + '\')');
            }
            return;
        }

        if (event.key === 'ArrowUp') {
            con.historyUp();
            return;
        }

        if (event.key === 'ArrowDown') {
            con.historyDown();
            return;
        }

        if (event.key === 'ArrowLeft') {
            con.pointerLeft();
            return;
        }

        if (event.key === 'ArrowRight') {
            con.pointerRight();
            return;
        }

        if (event.key === 'Backspace') {
            con.backspace();
            return;
        }

        if (event.key === 'Tab') {
            con.tabFinder();
            return;
        }

        if (event.key === 'Enter') {

            if (con.commandBuffer !== '') {
                con.setHistory(con.commandBuffer);
            }
            if (con.check(con.commandBuffer) !== undefined) {
                con.process = con.commandBuffer;
                eval('con.add.' + con.commandBuffer + '.start()');
                con.setCommandBuffer();
                return;
            }

            if (con.closing === 1) {
                if (con.commandBuffer === 'Y') {
                    $('body').empty();
                    $('body').css('background-color', 'gray');
                } else if(con.commandBuffer === 'N') {
                    con.closing = 0;
                    con.writeConsole('Exit canceled.');
                    con.writeConsole();
                    con.setCommandBuffer();
                } else {
                    con.writeConsole('Are you sure? Type Y - yes/ N - no.');
                    con.writeConsole();
                    con.setCommandBuffer();
                }
                return;
            }

            switch (con.commandBuffer) {
                case '':
                    return;
                    break;
                case 'exit':
                    con.closing = 1;
                    con.writeConsole('Are you sure? Type Y - yes/ N - no.');
                    con.writeConsole();
                    con.setCommandBuffer();
                    return;
                    break;
                case 'clear':
                    $(".row").remove();
                    con.writeConsole();
                    con.setCommandBuffer();
                    return;
                    break;
                case 'ls':
                    con.writeConsole('Не лезь, оно тебя сожрет!!1!');
                    con.writeConsole();
                    con.setCommandBuffer();
                    return;
                    break;
                case 'info':
                    con.writeConsole('Console. cmd.exe v.1.0.27');
                    con.writeConsole('Console emulator for web browser.');
                    con.writeConsole('Glory Light Studio | 2017');
                    con.writeConsole();
                    con.setCommandBuffer();
                    return;
                    break;
                case 'help':
                    con.writeConsole();
                    con.writeConsole('Main commands for this console:');
                    var counter = 0;
                    for (var process in con.add) {
                        if (con.add.hasOwnProperty(process)) {
                            //con.add[process].help();

                            var name = Object.keys(con.add)[counter];
                            var spacesAmount = 16 - name.length;
                            var spaces = '';
                            for (var i = 0; i < spacesAmount; i++) {
                                spaces += '&nbsp';
                            }

                            con.writeConsole(name + spaces + con.add[process].help);
                            counter++;
                        }
                    }
                    con.writeConsole('help&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspEnters this commandBuffers list.');
                    con.writeConsole('info&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspDisplay console info.');
                    con.writeConsole('exit&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspExiting from programs or console.');
                    con.writeConsole();
                    con.setCommandBuffer();
                    return;
                    break;
                default:
                    con.writeConsole('"' + con.commandBuffer + '" is not internal or external command, executable program or batch file.');
                    con.writeConsole();
                    con.setCommandBuffer();
                    break;
            }

        } else {
            if (con.iterupt === 0) {
                if (event.key.length === 1) {
                    var line = con.addCommandBuffer(event.key);
                    $('p').last().append(line);
                }
            }
        }
    });
};
con.main();
con.add.jscon = new process();
con.add.jscon.prepare = function () {
    $('.console').prepend('<div class="description">Enter javascript code, to get result.</div>');
    $('.console').prepend('<div class="title">Javascript console</div>');

    con.writeConsole('Enter code:');
};
con.add.jscon.execute = function () {
    con.writeConsole(eval(con.commandBuffer));
    con.writeConsole();
    con.setCommandBuffer();
    con.writeConsole('Enter code:');
};
con.add.jscon.help = "Emulate javascript console.";