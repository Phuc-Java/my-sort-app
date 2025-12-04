import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import MergeSortSection from '@/components/MergeSortSection';
import CountingSortSection from '@/components/CountingSortSection';
import ComparisonSection from '@/components/ComparisonSection';
import ReferencesSection from '@/components/ReferencesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <MergeSortSection />
        <CountingSortSection />
        <ComparisonSection />
        <ReferencesSection />
      </main>
      
      {/* Footer */}
      <footer className="py-8 border-t border-border/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Tác Giả Nguyễn Quang & Nguyễn Tuấn Phúc
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
