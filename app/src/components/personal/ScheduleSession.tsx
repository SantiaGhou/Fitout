import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Save, Edit, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface Session {
  id: string;
  date: string;
  time: string;
  notes?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface ScheduleSessionProps {
  studentId: string;
  studentName: string;
  onBack: () => void;
}

export const ScheduleSession: React.FC<ScheduleSessionProps> = ({
  studentId,
  studentName,
  onBack
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Mock existing sessions
  const existingSessions: Session[] = [
    {
      id: '1',
      date: '2024-01-20',
      time: '14:00',
      notes: 'Treino de peito e tríceps',
      status: 'scheduled'
    },
    {
      id: '2',
      date: '2024-01-22',
      time: '16:30',
      notes: 'Avaliação de progresso',
      status: 'scheduled'
    },
    {
      id: '3',
      date: '2024-01-15',
      time: '15:00',
      notes: 'Treino de costas',
      status: 'completed'
    }
  ];

  const handleScheduleSession = () => {
    if (date && time) {
      // Here you would save to API
      console.log('Scheduling session:', { date, time, notes, studentId });
      alert('Sessão agendada com sucesso!');
      setDate('');
      setTime('');
      setNotes('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'text-accent-blue';
      case 'completed': return 'text-accent-green';
      case 'cancelled': return 'text-accent-red';
      default: return 'text-content-secondary';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'scheduled': return 'Agendada';
      case 'completed': return 'Concluída';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-content-primary">Agendar Sessão</h1>
          <p className="text-content-secondary mt-1">
            Aluno: <span className="text-content-primary font-medium">{studentName}</span>
          </p>
        </div>
      </div>

      {/* Schedule New Session */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-4">Nova Sessão</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <Input
            label="Horário"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <Input
          label="Observações (opcional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Tipo de treino, foco da sessão..."
          className="mb-4"
        />

        <Button className=" mt-5"onClick={handleScheduleSession} disabled={!date || !time}>
          <Save className="h-4 w-4 mr-2" />
          Agendar Sessão
        </Button>
      </Card>

      {/* Existing Sessions */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-content-primary mb-4">
          Sessões Agendadas
        </h2>
        
        <div className="space-y-4">
          {existingSessions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((session) => (
            <Card key={session.id} className="p-4 bg-background-tertiary">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col items-center">
                    <Calendar className="h-5 w-5 text-content-brand mb-1" />
                    <Clock className="h-4 w-4 text-content-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-content-primary">
                      {formatDate(session.date)}
                    </h3>
                    <p className="text-content-secondary">
                      {formatTime(session.time)}
                    </p>
                    {session.notes && (
                      <p className="text-content-secondary text-sm mt-1">
                        {session.notes}
                      </p>
                    )}
                    <span className={`text-sm font-medium ${getStatusColor(session.status)}`}>
                      {getStatusLabel(session.status)}
                    </span>
                  </div>
                </div>

                {session.status === 'scheduled' && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className='text-content-secondary hover:text-content-brand'>
                      <Edit className="h-4 w-4 mr-1" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-content-secondary hover:text-accent-red transition-colors duration-250" />
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};