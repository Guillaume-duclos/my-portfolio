import { createRouter, createWebHistory, Router } from 'vue-router';
import Home from './views/Home.vue';
import ProfessionalProjects from './views/ProfessionalProjects.vue';
import PersonalProjects from './views/PersonalProjects.vue';
import Contact from './views/Contact.vue';
import Stack from './views/Stack.vue';
import NotFound from './views/NotFound.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: Home, meta: { name: 'Accueil' } },
    {
      path: '/professionalProjects',
      name: 'ProfessionalProjects',
      component: ProfessionalProjects,
      meta: { name: 'Projets Pro' },
    },
    {
      path: '/personalProjects',
      name: 'PersonalProjects',
      component: PersonalProjects,
      meta: { name: 'Projets Perso' },
    },
    { path: '/stack', name: 'Stack', component: Stack, meta: { name: 'Stack' } },
    { path: '/contact', name: 'Contact', component: Contact, meta: { name: 'Me contacter' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound, meta: { name: '404' } },
  ],
});

export default router;
