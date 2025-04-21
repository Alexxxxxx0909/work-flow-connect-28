
import React, { useEffect } from "react";
import { useJobs } from "@/contexts/JobContext";
import MainLayout from "@/components/Layout/MainLayout";
import { JobCard } from "@/components/JobCard";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { jobs, fetchJobs, savedJobIds, jobs: allJobs } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, []);

  // Mostrar las guardadas (usando savedJobIds)
  const savedJobs = allJobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Bienvenido a tu Panel</h1>
        <section>
          <h2 className="text-xl font-semibold mb-4">Propuestas guardadas</h2>
          <div className="space-y-5">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <p className="text-gray-600">No has guardado propuestas todavía.</p>
            )}
          </div>
        </section>
        <Link
          to="/jobs"
          className="inline-block mt-8 px-4 py-2 rounded bg-wfc-purple text-white font-medium hover:bg-wfc-purple-medium transition"
        >
          Ver todas las propuestas
        </Link>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
