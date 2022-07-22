import './AboutProject.css';

function AboutProject() {
    return (
        <section className='project'>
            <h2 className='project__title'>О проекте</h2>
            <div className='project__container-diplom'>
                <div className='project__container-text'>
                    <h3 className='project__subtitle'>Дипломный проект включал 5 этапов</h3>
                    <p className='project__text'>Составление плана, работу над бекэндом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div>
                    <h3 className='project__subtitle'>На выполнение диплома ушло 5 недель</h3>
                    <p className='project__text'>У каджого этапа был мягкий и жесткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className='project__container-calendar'>
                <p className='project__weekback'> 1 неделя</p>

                <p className='project__weekfront'>4 недели</p>
                <p className='project__caption'>Backend</p>
                <p className='project__caption'>Front-end</p>
            </div>
        </section>
    );
}

export default AboutProject;