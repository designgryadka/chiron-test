import React from 'react';
import { EmployeeHome } from '../EmployeeHome/EmployeeHome';
import { LessonPage } from '../Lesson/Lesson';

type PortalPage = 'home' | 'lesson';

const pageFromHash = (): PortalPage => (window.location.hash === '#lesson' ? 'lesson' : 'home');

/**
 * Home and lesson pages wired together: «Начать урок» opens the lesson, «Назад»
 * returns home. The page is kept in the URL hash (#lesson), so the browser «Back»
 * button and shared links work too. The theme carries over (it lives on <html>).
 */
export function Portal() {
  const [page, setPage] = React.useState<PortalPage>(pageFromHash);

  React.useEffect(() => {
    const onHashChange = () => setPage(pageFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // A new page always starts at the top.
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const open = (next: PortalPage) => {
    window.location.hash = next === 'lesson' ? 'lesson' : '';
  };

  return page === 'lesson' ? (
    <LessonPage onBack={() => open('home')} />
  ) : (
    <EmployeeHome onStartLesson={() => open('lesson')} />
  );
}
