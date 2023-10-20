import React from 'react';
import Link from 'next/link';

export default function IndexPage() {
  return (
    <>
      <p>Hey!</p>
      <Link href="/sell">
        <a>Sell!</a>
      </Link>
    </>
  );
}
