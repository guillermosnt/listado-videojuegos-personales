import { Component } from '@angular/core';
import { Game } from '../../models/game';
import { GameCard } from '../../components/game-card/game-card';
import { AddGameModal } from '../../components/add-game-modal/add-game-modal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GameCard, AddGameModal],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  games: Game[] = [
    {
      id: 1,
      name: 'The Witcher 3',
      platform: 'PC',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/292030/library_600x900.jpg',
      status: 'PENDING',
    },

    {
      id: 2,
      name: 'Elden Ring',
      platform: 'PC',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/library_600x900.jpg',
      status: 'PENDING',
    },

    {
      id: 3,
      name: 'Cyberpunk 2077',
      platform: 'PC',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/library_600x900.jpg',
      status: 'PLAYING',
    },

    {
      id: 4,
      name: 'Red Dead Redemption 2',
      platform: 'PC',
      imageUrl: 'https://cdn.akamai.steamstatic.com/steam/apps/1174180/library_600x900.jpg',
      status: 'COMPLETED',
    },
  ];

  get totalGames(): number {
    return this.games.length;
  }

  get pendingGames(): number {
    return this.games.filter((game) => game.status === 'PENDING').length;
  }

  get playingGames(): number {
    return this.games.filter((game) => game.status === 'PLAYING').length;
  }

  get completedGames(): number {
    return this.games.filter((game) => game.status === 'COMPLETED').length;
  }

  showAddGameModal = false;

  openAddGameModal(): void {
    this.showAddGameModal = true;
  }

  closeAddGameModal(): void {
    this.showAddGameModal = false;
  }

  handleGameAdded(game: Game): void {
    this.games.unshift(game);
    this.showAddGameModal = false;
  }

  searchTerm = '';

  activeFilter: 'ALL' | 'PENDING' | 'PLAYING' | 'COMPLETED' = 'ALL';

  setFilter(filter: 'ALL' | 'PENDING' | 'PLAYING' | 'COMPLETED'): void {
    this.activeFilter = filter;
  }

  get filteredGames(): Game[] {
    return this.games.filter((game) => {
      const matchesSearch = game.name.toLowerCase().includes(this.searchTerm.toLowerCase().trim());

      const matchesFilter = this.activeFilter === 'ALL' || game.status === this.activeFilter;

      return matchesSearch && matchesFilter;
    });
  }
}
