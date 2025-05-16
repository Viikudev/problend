'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function IssueDetail() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/issues');
  }, [router]); 
  return (
    <div>
      <p>Redirigiendo a la página principal de issues...</p>
    </div>
  );
}