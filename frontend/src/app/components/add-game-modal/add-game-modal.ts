import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Game } from '../../models/game';

@Component({
  selector: 'app-add-game-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-game-modal.html',
  styleUrl: './add-game-modal.css',
})
export class AddGameModal {
  @Output() closeModal = new EventEmitter<void>();
  @Output() gameAdded = new EventEmitter<Game>();

  name = '';
  platform = 'PC';
  status: Game['status'] = 'PENDING';

  imageUrl = '';
  imagePreview: string | null = null;
  selectedImage: File | null = null;

  close(): void {
    this.closeModal.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp'];

    if (!allowedTypes.includes(file.type)) {
      alert('Formato no válido. Utiliza PNG, JPG o WEBP.');
      input.value = '';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede superar los 5 MB.');
      input.value = '';
      return;
    }

    this.selectedImage = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.imageUrl = '';
    };

    reader.readAsDataURL(file);
  }

  onUrlChange(): void {
    if (!this.selectedImage) {
      this.imagePreview = this.imageUrl.trim() || null;
    }
  }

  saveGame(): void {
    if (!this.name.trim()) {
      alert('Introduce el nombre del videojuego.');
      return;
    }

    const newGame: Game = {
      id: Date.now(),
      name: this.name.trim(),
      platform: this.platform,
      status: this.status,
      imageUrl: this.imagePreview || '',
    };

    this.gameAdded.emit(newGame);
  }
}
