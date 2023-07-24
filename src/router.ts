import { createRouter, createWebHashHistory, Router } from 'vue-router';
import ProfessionalProjects from './views/ProfessionalProjects.vue';
import PersonalProjects from './views/PersonalProjects.vue';
import Contact from './views/Contact.vue';
import Stack from './views/Stack.vue';
import Home from './views/Home.vue';

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/home', name: 'Home', component: Home, meta: { name: 'Accueil' } },
    {
      path: '/professional-projects',
      name: 'ProfessionalProjects',
      component: ProfessionalProjects,
      meta: { name: 'Projets Pro' },
    },
    {
      path: '/personal-projects',
      name: 'PersonalProjects',
      component: PersonalProjects,
      meta: { name: 'Projets Perso' },
    },
    { path: '/stack', name: 'Stack', component: Stack, meta: { name: 'Stack' } },
    { path: '/contact', name: 'Contact', component: Contact, meta: { name: 'Me contacter' } },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Home' },
    },
  ],
});

export default router;
