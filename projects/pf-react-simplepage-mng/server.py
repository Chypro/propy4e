from flask import Flask, request, jsonify
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import smtplib
import ssl
from email.message import EmailMessage
from flask_cors import CORS

app = Flask (__name__)
CORS(app, origins=['http://localhost:5173'])


@app.route('/sendMail', methods=['POST'])
def sendMail():
    try:
        
        data = request.get_json()
        
        if data!=None:
            
            email_sender = ''
            email_password = ''
            email_receiver = ''
            
            subject = 'Join Our SimplePage Workspace: Invitation Inside'
            body = 'This is a test email sent from SimplePage User Menu to check if the user get the invitation'
            em = MIMEMultipart()
            em['From'] = email_sender
            em['To'] = email_receiver
            em['Subject'] = subject
            em.attach(MIMEText(body, 'plain'))

            text = ""

            # write the HTML part
            html = """\
            <!DOCTYPE html>
            <html lang="en">
            <head>
            <title>Signup Invitation</title>
            <style>
                body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                }

                .container {
                width: 80%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin-top: 10%;
                }

                h1 {
                color: #333333;
                display: flex;
                align-items: center;
                justify-items: center;
                justify-content: center;
                }

                p {
                color: #666666;
                }

                .btn {
                display: inline-block;
                padding: 10px 20px;
                text-decoration: none;
                background-color: #3498db;
                color: #ffffff;
                border-radius: 5px;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <h1>Welcome to Our Simple Page</h1>
                <p>We're excited to have you on board. Click the button below to complete your signup:</p>
                <a href="your_signup_link_here" class="btn">Signup Now</a>
                <p>If the button above doesn't work, you can also copy and paste the following link into your browser:</p>
                # <p>www.your_signup_link_here.com</p>
            </div>
            </body>
            </html>

            """

            part2 = MIMEText(html, "html")
            em.attach(part2)

            context = ssl.create_default_context()
            
            l = []
            
            for i in data:
                print("email::",i['email'])
                try:
                    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
                        smtp.login(email_sender, email_password)
                        smtp.sendmail(email_sender, i['email'], em.as_string())
                    print("send mail to ",i['email']," successfully")
                    l.append(True)
                except:
                    l.append(False)
                
            return jsonify({'status_list': l}), 200     
        else:
            return {'message': 'not successfully send mail'}, 400 
                 
            
    except Exception as e:
        print("error:",e)
        return  {'message': 'error'}, 400

if __name__ == "__main__":
    app.run(debug=True)