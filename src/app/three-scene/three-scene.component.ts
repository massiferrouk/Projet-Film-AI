import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-three-scene',
  template: '<div #rendererContainer class="h-full w-full"></div>',
  styleUrls: ['./three-scene.component.css']
})
export class ThreeSceneComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private cube!: THREE.Mesh;
  private animationFrameId!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJs();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }

  private initThreeJs(): void {
    // Configure la scène
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);

    // Configure la caméra
    const containerWidth = this.elRef.nativeElement.offsetWidth;
    const containerHeight = this.elRef.nativeElement.offsetHeight;
    this.camera = new THREE.PerspectiveCamera(75, containerWidth / containerHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // Configure le rendu
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(containerWidth, containerHeight);
    this.elRef.nativeElement.querySelector('#rendererContainer').appendChild(this.renderer.domElement);

    // Ajouter une lumière
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 10, 10);
    this.scene.add(light);

    // Ajouter un cube
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshStandardMaterial({ color: 0x007bff });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    // Rotation du cube
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    // Rendu de la scène
    this.renderer.render(this.scene, this.camera);
  }
}
