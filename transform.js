import { vec3, mat4, vec4, mat3, quat } from 'https://cdn.skypack.dev/gl-matrix';

export class Transform
{
	constructor()
	{
		this.translate = vec3.create();
		vec3.set(this.translate, 0, 0, 0);
		
		this.scale = vec3.create();
		this.scaleX = 1;
		this.scaleY = 1;
		this.scaleZ = 1;
		vec3.set(this.scale, 1, 1, 1);
		
		this.rotationAngle = 0;
		this.rotationPoint = [0, 0, 0];
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 0, 0, 0);

		this.angleX = 0;
		this.angleY = 0;
		this.angleZ = 0;
		this.quaternion = quat.create()

		this.modelTransformMatrix = mat4.create();
		mat4.identity(this.modelTransformMatrix);
		// console.log(this.modelTransformMatrix)

		this.lastTransformMatrix = this.modelTransformMatrix;

		this.updateModelTransformMatrix();
	}

	updateModelTransformMatrix()
	{	
		// @ToDO
		// 1. Reset the transformation matrix
		// 2. Use the current transformations values to calculate the latest transformation matrix
		var identity = mat4.create()
		mat4.identity(identity);

		// translation
		this.translationMat = mat4.create();
		mat4.translate(this.translationMat, identity, this.translate);
		// console.log(this.translationMat)

		//rotation about the set point (either origin or if some other point set by the shape)
		//first, translate to origin about that point
		// this.rotationMat = mat4.create();
		// var temp = vec3.create();
		// vec3.set(temp, this.rotationPoint[0], this.rotationPoint[1], this.rotationPoint[2]);
		// mat4.translate(this.rotationMat, identity, temp);
		// mat4.rotate(this.rotationMat, this.rotationMat, this.rotationAngle, this.rotationAxis);
		// vec3.set(temp, -this.rotationPoint[0], -this.rotationPoint[1], -this.rotationPoint[2]);
		// mat4.translate(this.rotationMat, this.rotationMat, temp);

		this.rotationMat = mat4.create();
		// var temp = vec3.create();
		// vec3.set(temp, this.rotationPoint[0], this.rotationPoint[1], this.rotationPoint[2]);
		// mat4.translate(this.rotationMat, identity, temp);

		mat4.fromQuat(this.rotationMat, this.quaternion);

		// vec3.set(temp, -this.rotationPoint[0], -this.rotationPoint[1], -this.rotationPoint[2]);
		// mat4.translate(this.rotationMat, this.rotationMat, temp);


		// Scaling
		this.scalingMat = mat4.create();
		var temp = vec3.create();
		vec3.set(temp, this.rotationPoint[0], this.rotationPoint[1], this.rotationPoint[2]);
		mat4.translate(this.scalingMat, identity, temp);
		mat4.scale(this.scalingMat, this.scalingMat, this.scale);
		vec3.set(temp, -this.rotationPoint[0], -this.rotationPoint[1], -this.rotationPoint[2]);
		mat4.translate(this.scalingMat, this.scalingMat, temp);

		// Linear transformation
		mat4.multiply(this.modelTransformMatrix, this.translationMat, this.scalingMat);
		mat4.multiply(this.modelTransformMatrix, this.modelTransformMatrix, this.rotationMat);		
	}	

	translation(changeX, changeY, changeZ) {
		vec3.set(this.translate, this.translate[0]+changeX, this.translate[1]+changeY, this.translate[2]+changeZ);
		// console.log(this.translate);
	}

	setPosition(x, y, z) {
		vec3.set(this.translate, x, y, z);
	}

	rotateAboutLocalPoint(angle) {
		this.rotationAngle += angle;
	}

	setAngleAboutLocalPoint(angle) {
		this.rotationAngle = angle;
	}

	setRotationAxis(x, y, z) {
		vec3.set(this.rotationAxis, x, y, z);
	}
	
	setRotationPoint(x, y, z) {
		this.rotationPoint = [x, y, z];
	}

	setScale(x, y, z) {
		this.scaleX = x
		this.scaleY = y
		this.scaleZ = z
		vec3.set(this.scale, x, y, z);
	}

	scaling(x, y, z) {
		this.scaleX += x
		this.scaleY += y
		this.scaleZ += z
		vec3.set(this.scale, this.scaleX, this.scaleY, this.scaleZ)
	}

	setQuaternionAngles(x, y, z) {
		// x = x * Math.PI/180
		// y = y * Math.PI/180
		// z = z * Math.PI/180
		quat.identity(this.quaternion)
		this.angleX = x
		this.angleY = y
		this.angleZ = z
		// quat.rotateX(this.quaternion, this.quaternion, x)
		// quat.rotateY(this.quaternion, this.quaternion, y)
		// quat.rotateZ(this.quaternion, this.quaternion, z)
		quat.fromEuler(this.quaternion, x, y, z)
	}

	quaternionRotation(x, y, z) {
		quat.identity(this.quaternion)
		this.angleX += x
		this.angleY += y
		this.angleZ += z
		quat.fromEuler(this.quaternion, this.angleX, this.angleY, this.angleZ)
	}
}