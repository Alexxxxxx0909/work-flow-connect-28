
import React, { useEffect, useState } from "react";
import { useJobs } from "@/contexts/JobContext";
import MainLayout from "@/components/Layout/MainLayout";
import { JobCard } from "@/components/JobCard";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { jobs, fetchJobs, savedJobIds, loading } = useJobs();
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await fetchJobs();
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Filtrar los trabajos guardados usando savedJobIds
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id));

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Bienvenido a tu Panel</h1>
        <section>
          <h2 className="text-xl font-semibold mb-4">Propuestas guardadas</h2>
          
          {isLoading || loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-wfc-purple"></div>
            </div>
          ) : (
            <div className="space-y-5">
              {savedJobs.length > 0 ? (
                savedJobs.map((job) => <JobCard key={job.id} job={job} />)
              ) : (
                <p className="text-gray-600">No has guardado propuestas todavía.</p>
              )}
            </div>
          )}
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
