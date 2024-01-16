# CT6042 - Secure Coding Assignment

This repository contains the vulnerable and secure code for the following solutions:

1) SQL Injection
2) Cross Site Scripting (XSS)
3) Encryption
4) ReCAPTCHA
5) Deserialization exploit (Using JSON in .NET)

The first four vunerablities have been implemented within one solution, named "Message Board".
Message Board is an application that allows registered users to post messages for anyone to see.

## Message Board

This Message Board, is a web application written using NodeJS, that contains three security vunerablities within it's code. Below is a list of the vunerablities, along with an example to abuse them.

- Cross Site Scripting (XSS):
  1) The message below sends a POST request containing the user's user object stored in local storage. This can be included within the contents of a message

    ```html
    <img src=1 onerror="fetch(`/yoinked`, { method: `POST`, body: JSON.stringify({ user: JSON.parse(localStorage.getItem(`messageBoardUser`)) }) })">
    ```

- SQL Injection:
  1) Thoughout the application, all endpoints consist of concatenated SQL queries, rather than using parameterized databases.
- Encryption:
  1) The application does not encrypt/hash the user's password.
- ReCAPTCHA:
  1) ReCAPTCHA has been implemented to the message board's secure implementation to show how it can prevent bruteforcing attacks.

## Calculator API

This is a simple calculator REST API that has been developed using C# that implements a JSON deserialization exploit.
