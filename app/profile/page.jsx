'use client';

import React from 'react';
import { Row, Col } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import DieteryOptions from '../../components/DieteryOptions';

function Profile() {
  const { user, isLoading } = useUser();

  return (
    <>
      {isLoading && <Loading />}
      {user && (
        <>
          <div className="align-items-center profile-header mb-5 text-center text-md-left d-flex flex-column align-items-center"> {/* Add flex properties */}
    <div>
        <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            decode="async"
            data-testid="profile-picture"
        />
    </div>
    <div>
        <h2 data-testid="profile-name">{user.name}</h2>
        <p className="lead text-muted">
            {user.email}
        </p>
    </div>
</div>
<div data-testid="profile-json" className="d-flex justify-content-center"> {/* Center this div */}
    <DieteryOptions />
</div>
        </>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <Loading />,
  onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});