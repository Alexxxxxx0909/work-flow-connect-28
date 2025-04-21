
import React, { useEffect } from 'react';
import { useJobs } from '@/contexts/JobContext';
import { JobCard } from '@/components/JobCard';
import MainLayout from '@/components/Layout/MainLayout';

const JobsPage = () => {
  const { jobs, fetchJobs } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Propuestas</h1>
        <div className="space-y-6">
          {jobs && jobs.length > 0 ? (
            jobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-600 mt-8">No hay propuestas disponibles.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default JobsPage;
