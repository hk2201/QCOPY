// Function to fetch data from data.txt
function fetchData(callback) {
    fetch('data.txt')
        .then(response => response.text())
        .then(data => {
            const lines = data.trim().split('\n');
            const passwords = lines.map(line => {
                const [title, password] = line.trim().split(' ');
                return { title, password };
            });
            callback(passwords);
        })
        .catch(error => console.error('Error fetching data:', error));
}

function copyPassword(password) {
    var tempInput = document.createElement("input");
    tempInput.value = password;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function displayPasswords() {
    fetchData(passwords => {
        var passwordList = document.getElementById("passwordList");
        passwordList.innerHTML = "";

        passwords.forEach(function (passwordEntry) {
            var listItem = document.createElement("li");
            listItem.style.fontWeight = "bold";
            var copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.addEventListener('click', function() {
                copyPassword(passwordEntry.password);
            });
            listItem.appendChild(document.createTextNode(passwordEntry.title + " "));
            listItem.appendChild(copyButton);
            passwordList.appendChild(listItem);
        });
    });
}

displayPasswords();