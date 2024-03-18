function addContact() {
    console.log('fff');
    const name = document.getElementsByName('name')[0].value;
    const phone = document.getElementsByName('phone')[0].value;

    fetch('/Add', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
    .then(res => res.json())
    .then(()=> window.location.href='/');
}

function updateContact() {
    console.log('update');
    const id = document.querySelector('.form').getAttribute('data-key');
    const name = document.querySelector('input[name="name"]').value;
    const phone = document.querySelector('input[name="phone"]').value;

    fetch(`/Update?id=${id}`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, phone})
    })
    .then(res => res.json())
    .then(()=> window.location.href='/');
}

function CancelAndBack() {
    console.log('Cancel');
    window.location.href='/'
}

function deleteContact() {
    const id = document.querySelector('.form').getAttribute('data-key');
    
    fetch(`/Delete?id=${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},      
    });
    window.location.href = '/';
}


function blockButton(name, phone) {
    const button = document.getElementById('delete-button');
    if (document.getElementsByName('name').value !== name ||
        document.getElementsByName('phone').value !== phone) {
        button.setAttribute('disabled', 'true');
    } else {
        button.setAttribute('disabled', 'false');
    }
}
