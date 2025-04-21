
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, HeartOff, Bookmark, BookmarkCheck } from 'lucide-react';
import { useJobs } from '@/contexts/JobContext';

type JobProps = {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  userId: string;
  userName: string;
  timestamp: number;
  status: 'open' | 'in-progress' | 'completed' | 'assigned' | 'cancelled';
  comments: any[];
  likes: string[];
  savedBy?: any[];
};

export const JobCard = ({ job }: { job: JobProps }) => {
  const {
    likedJobIds,
    savedJobIds,
    toggleJobLike,
    toggleSaveJob
  } = useJobs();

  // Determinar likes actuales y si el usuario ya dio like
  const likesCount = Array.isArray(job.likes) ? job.likes.length : 0;
  const isLiked = likedJobIds.includes(job.id);
  const isSaved = savedJobIds.includes(job.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleJobLike(job.id);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSaveJob(job.id);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="hover:border-wfc-purple transition-colors w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-medium">{job.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              Publicado por {job.userName} • {formatDate(job.timestamp)}
            </p>
          </div>
          <div className={`
            text-xs px-2 py-1 rounded-full
            ${job.status === 'open' ? 'bg-green-100 text-green-800' : 
              job.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 
              'bg-gray-100 text-gray-800'}
          `}>
            {job.status === 'open' ? 'Abierto' : 
            job.status === 'in-progress' ? 'En progreso' : 
            job.status === 'completed' ? 'Completado' :
            job.status === 'assigned' ? 'Asignado' : 'Cancelado'}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium mb-1">Descripción</h3>
            <p className="text-sm text-gray-700 line-clamp-3">{job.description}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium mb-1">Habilidades requeridas</h3>
            <div className="flex flex-wrap gap-1">
              {job.skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-end mt-2 gap-2">
            <div>
              <div className="text-sm font-medium">
                Presupuesto: ${job.budget}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {job.comments.length} {job.comments.length === 1 ? 'comentario' : 'comentarios'}
              </div>
            </div>
            <Link to={`/jobs/${job.id}`}>
              <Button variant="outline" size="sm">Ver detalles</Button>
            </Link>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLikeClick}
            className={`flex items-center gap-1 text-sm ${isLiked ? 'text-wfc-purple font-bold' : 'text-gray-500 hover:text-wfc-purple'}`}
            title={isLiked ? "Quitar like" : "Dar like"}
          >
            {isLiked ? <HeartOff className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
            {likesCount}
          </button>
          <button
            onClick={handleSaveClick}
            className={`flex items-center gap-1 text-sm ${isSaved ? 'text-wfc-purple font-bold' : 'text-gray-500 hover:text-wfc-purple'}`}
            title={isSaved ? "Quitar de guardados" : "Guardar propuesta"}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
        {/* cualquier otro action */}
      </CardFooter>
    </Card>
  );
};
