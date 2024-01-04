# Below readme is no more useful now. Since we have migrated the codebase to other place with new steps for setup the application.
# Please navigate to new repo and check the readme - https://github.com/avinetworks/avi-migrationtools



----------------------------------------------------------------------------------------------------------------------------------------------------------------

# Overview
## avinetworks/avitools docker image
The container is designated to host all the required migration and verification tools needed in the field. Please refer for the Dockerfile for the list of included tools.

# docker pull avinetworks/avitools:$VERSION
There is no latest tag, please use the version specific pull, for example: avinetworks/avitools:20.1.3

# Usage
## Docker image can be consumed using run.sh script under git:avinetworks/avitools/run.sh
```bash
$ curl -O https://raw.githubusercontent.com/avinetworks/avitools/master/run.sh
$ chmod a+x run.sh
./run.sh -h
-v string    specify AVI_VERSION, default value: 20.1.3
-c string    specify CMD to execute, in this mode container will be created and destroyed on command run, default value: avitools-list
-d string    specify working directory, where configuration files will exist, default value: /Users/smarunich/GitHub/avitools/scripts/avi
-u           update docker image, i.e. try to pull docker image again
-b           run in background, other words create avitools container and retain it, container can be accessible after script execution, for example as "docker exec -it avitools bash", default value: avitools-list
-n           use host networking instead of docker daemon default network, i.e. docker run --net=host
```
## Using -v flag you can specify the container version, otherwise default value will be assumed.

## To show the commands supported by avitools
```
$ ./run.sh -c avitools-list or ./run.sh or ./run.sh -v 20.1.3 -c avitools-list
```
## To show the commands supported by avitools 20.1.3 version of container
```
$ ./run.sh -v 20.1.3 -c avitools-list

## To run ansible playbook
```
$ ./run.sh -c "ansible-playbook <playbook-name> -v"
```
## To run container in background
```
$ ./run.sh -v 20.1.3 -c bash -d /home/aviuser/workspace -b
$ docker exec -it avitools bash
```
## Docker - "-n" use host networking, supported in both modes (background and foreground/cmd mode).
```
$ ./run.sh -v 20.1.3 -n -c bash -d /home/aviuser/workspace -b
```

## Optional
### Build instructions
```
cd build
docker build -t avinetworks/avitools:20.1.3 .
```
### How you can use migrationtools docker image
First you need to build a docker image
Run the run.sh which is in scripts directory to run avitools on that image
