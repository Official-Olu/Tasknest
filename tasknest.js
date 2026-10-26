(function () {
  'use strict';

  // ---- Saved "session" data, stored the way a beginner might ----
  localStorage.setItem('apiKey', 'FAKE_API_KEY_0000_do_not_use');
  localStorage.setItem('jwt', 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiJmYWtlLXVzZXIiLCJub3RlIjoidGVzdC1vbmx5LW5vdC1hLXJlYWwtdG9rZW4ifQ.FAKESIGNATURE');
  localStorage.setItem('savedPassword', 'FAKE-PASSWORD-test-only');
  sessionStorage.setItem('userProfile', JSON.stringify({
    name: 'Test User',
    email: 'test.user@example.com',
    phone: '07700 900123'
  }));

  // ---- A "quick calculation" helper that uses eval ----
  try {
    eval('1 + 1');
  } catch (err) {
    // Blocked by the page's Content Security Policy.
  }

  // ---- The to-do list itself ----
  var form = document.getElementById('task-form');
  var input = document.getElementById('task-input');
  var list = document.getElementById('tasks');
  var KEY = 'tasks';

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function save(tasks) {
    localStorage.setItem(KEY, JSON.stringify(tasks));
  }

  function render() {
    var tasks = load();
    list.textContent = '';
    if (tasks.length === 0) {
      var empty = document.createElement('li');
      empty.className = 'empty';
      empty.textContent = 'No tasks yet.';
      list.appendChild(empty);
      return;
    }
    tasks.forEach(function (text, index) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.textContent = text;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'remove';
      btn.textContent = 'Remove';
      btn.addEventListener('click', function () {
        var current = load();
        current.splice(index, 1);
        save(current);
        render();
      });
      li.appendChild(span);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = input.value.trim();
    if (!value) { return; }
    var tasks = load();
    tasks.push(value);
    save(tasks);
    input.value = '';
    render();
  });

  render();
})();
