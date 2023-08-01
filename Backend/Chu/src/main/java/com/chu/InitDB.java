package com.chu;

import com.chu.designer.domain.Designer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;

        public void dbInit1() {
            Designer designer1 = createDesigner("민지",4.0F);
            em.persist(designer1);
            Designer designer2 = createDesigner("하진",4.0F);
            em.persist(designer2);
        }

        private Designer createDesigner(String name, Float reviewScore) {
            Designer designer = new Designer();
            designer.setName(name);
            designer.setReviewScore(reviewScore);

            return designer;
        }
    }
}
