var btnStart = document.querySelector('.timer__button-start');
var btnSplit = document.querySelector('.timer__button-split');
var btnReset = document.querySelector('.timer__button-reset');
var display = document.querySelector('.timer__display');
var pitStops = document.querySelector('.timer__pit-stops');
var counterValue; // ����� ����� ������ ������� ��� ����������� � ��������
var startTime; // ������� ������� ������ ������� ��������� �� ������ ������� �����
var runInterval; // ������������ ������ �� ������� ����� �� ������� �� ����� ��� ����. ���� ���������� ��������, � ����� - ���
var stageCounter; // ���������� ����� ��� Stop/Split
var intervalID; // ������������� �������
var runMode = false; // ����� ������. true - ��������, false - �����.

btnStart.addEventListener('click',
    function () {
        if (runMode) {
            // Stop
            appendShot('Stop');
            btnStart.innerHTML = 'Start';
            stopTimer();
        } else {
            // Start
            btnStart.innerHTML = 'Stop';
            startTime = Date.now();
            counterValue += runInterval;
            startTimer();
        }
    }
);

btnSplit.addEventListener('click',
    function() {
        if (runMode) appendShot('Split');
    }
)

btnReset.addEventListener('click', btnResetHandler);

btnResetHandler();

/* ����� ���������� ������� */

/* ���������� ������� */

function btnResetHandler() {
    stopTimer();
    display.innerHTML = format(0);
    pitStops.innerHTML = '';
    stageCounter = 1;
    counterValue = runInterval = 0;
    btnStart.innerHTML = 'Start';
}

function timerHandler(e) {
    runInterval = Date.now() - startTime;
    display.innerHTML = format(counterValue + runInterval);
}

function startTimer() {
    intervalID = setInterval(timerHandler, 27);
    runMode = true;
}

function stopTimer() {
    clearInterval(intervalID);
    runMode = false;
}

function format(ms) {
    // ������������� �������� � ������ ��� ����� ��������� ����. ����� ����� �������� 00:00:00 � ��������� ��� � d
    var d = new Date(ms).toUTCString().replace(/.*([0-9][0-9]:[0-9][0-9]:[0-9][0-9]).*/,'$1');
    // �������� ����������� � ��������� ������ ����� �� 3-� ������
    var x = String(ms % 1000);
    while(x.length < 3) x='0'+x;
    // ������������ ����������� � span ��� ��������������
    d += '.<span>' + x + '</span>';
    return d;
}

function appendShot(label) {
    // ������������� ��������� ����� ������ - ����� �������
    var txt = [stageCounter++, label, format(runInterval)];
    // ������� �������
    var newElem;
    newElem = document.createElement('p');
    // ��������� ��� ������� ������������ �� ��������� ������, ����������� ��������
    newElem.innerHTML = txt.join(' ');
    // �������� � DOM
    pitStops.appendChild(newElem);
}