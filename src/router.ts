import { createRouter, createWebHistory, Router } from 'vue-router';
import Home from './views/Home.vue';
import ProfessionalProjects from './views/ProfessionalProjects.vue';
import PersonalProjects from './views/PersonalProjects.vue';
import Contact from './views/Contact.vue';
import Stack from './views/Stack.vue';

const router: Router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/home', name: 'Home', component: Home },
    {
      path: '/professionalProjects',
      name: 'ProfessionalProjects',
      component: ProfessionalProjects,
    },
    { path: '/personalProjects', name: 'PersonalProjects', component: PersonalProjects },
    { path: '/stack', name: 'Stack', component: Stack },
    { path: '/contact', name: 'Contact', component: Contact },
  ],
});

export default router;
