# Welcome to The Cloud


## Deploying to EC2

- Create Ec2 instance
	- Select Ubuntu 18 AMI
	- Edit SG to open port 80
	- Create key pair, and download
	- (everything else, select defaults)

- ...wait to initialize

- SSH into instance
	- Find instance in EC2
	- Copy "Public IP Address"
	- chmod 400 aws.pem
	- ssh -i aws.pem ubuntu@<ip-address>
	- The authenticity of host '34.205.19.247 (34.205.19.247)' can't be established.
		--> answer yes

- Install node.js on server
	- sudo apt update
	  sudo apt install -y nodejs npm
	

- Download app code
	- git clone https://github.com/eschwartz/prime-cloud-intro.git
	- cd prime-cloud-intro
	- npm install
	
- Run the express.js server
	 - sudo npm start

- Test it out:
	- http://3.88.193.218/
