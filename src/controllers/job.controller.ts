import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { Job } from '../models';
import { JobRepository } from '../repositories';
import { PermissionKeys } from '../authorization/permisos-key';
import { authenticate } from '@loopback/authentication';

export class JobController {
  constructor(
    @repository(JobRepository)
    public jobRepository: JobRepository,
  ) { }

  //el administrador debe estar autenticado
  //solo el administrador puede acceder a esta ruta
  @post('/jobs', {
    responses: {
      '200': {
        description: 'Job model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Job) } },
      },
    },
  })
  @authenticate('jwt', { required: [PermissionKeys.CreateJob] })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, {
            exclude: ['id']

          }),
        },
      },
    })
    job: Job,
  ): Promise<Job> {
    return this.jobRepository.create(job);
  }

  @get('/jobs/count', {
    responses: {
      '200': {
        description: 'Job model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.count(where);
  }

  @get('/jobs', {
    responses: {
      '200': {
        description: 'Array of Job model instances',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Job) },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Job)) filter?: Filter<Job>,
  ): Promise<Job[]> {
    return this.jobRepository.find(filter);
  }
  //el administrador debe estar autenticado
  //solo el administrador puede acceder a esta ruta
  @patch('/jobs', {
    responses: {
      '200': {
        description: 'Job PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, { partial: true }),
        },
      },
    })
    job: Job,
    @param.query.object('where', getWhereSchemaFor(Job)) where?: Where<Job>,
  ): Promise<Count> {
    return this.jobRepository.updateAll(job, where);
  }

  @get('/jobs/{id}', {
    responses: {
      '200': {
        description: 'Job model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Job) } },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Job> {
    return this.jobRepository.findById(id);
  }
  //el administrador debe estar autenticado
  //solo el administrador puede acceder a esta ruta
  @patch('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Job PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Job, { partial: true }),
        },
      },
    })
    job: Job,
  ): Promise<void> {
    await this.jobRepository.updateById(id, job);
  }

  @put('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Job PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() job: Job,
  ): Promise<void> {
    await this.jobRepository.replaceById(id, job);
  }
  //el administrador debe estar autenticado
  //solo el administrador puede acceder a esta ruta
  @del('/jobs/{id}', {
    responses: {
      '204': {
        description: 'Job DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.jobRepository.deleteById(id);
  }
}
