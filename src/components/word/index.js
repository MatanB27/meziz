import './index.scss'

function Word(props) {

    const { 
        className,
        word,
        isShown,
    } = props;

    return (
        <div className={word !== ' ' ? 'word-wrapper ' : 
        'space-wrapper ' + (className)}>
            {
                !isShown ? 
                    <span className={'word'}>_</span>
                    :
                word !== ' ' ? 
                <span className={'word'}>{word}</span> :
                <span className={'space'}>-</span>

            }
        </div>
    );
};

export default Word;