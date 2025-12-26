import Header2 from '../../ui/header-2';
import ReferAndWin from './refer-and-win';
import ShareYourStack from './share-your-stack';

export default function EarnMorePoints() {
  return (
    <div>
      <Header2 title="Earn More Points" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <ReferAndWin />
        <ShareYourStack />
      </div>
    </div>
  );
}
