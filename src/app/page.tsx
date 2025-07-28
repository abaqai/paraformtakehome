import JobDetails from '@/components/JobDetails';
import { mockJob } from '@/lib/mockData';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <JobDetails job={mockJob} />
    </div>
  );
}
